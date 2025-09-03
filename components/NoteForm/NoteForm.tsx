

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';
import { NoteTag } from '@/types/note';

interface NoteFormProps {
  onCancel: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag | '';
}

const tagOptions: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const validationSchema = Yup.object({
  title: Yup.string().min(3, 'Min 3 symbols').max(50, 'Max 50 symbols').required('Required'),
  content: Yup.string().max(500, 'Max 500 symbols'),
  tag: Yup.string().oneOf(tagOptions, 'Invalid tag').required('Required'),
});


const NoteForm: React.FC<NoteFormProps> = ({ onCancel }) => {
  const queryClient = useQueryClient();
  const resetFormRef = useRef<(() => void) | null>(null);
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      if (resetFormRef.current) {
        resetFormRef.current();
      }
      onCancel();
    },
  });

  return (
    <Formik<FormValues>
      initialValues={{ title: '', content: '', tag: '' }}
      validationSchema={validationSchema}
      onSubmit={(
        values: FormValues,
        { resetForm }: FormikHelpers<FormValues>
      ) => {
        resetFormRef.current = resetForm;
        if (values.tag !== '') {
          mutation.mutate({
            title: values.title,
            content: values.content,
            tag: values.tag
          });
        }
      }}
    >
      {({ isSubmitting, isValid }: { isSubmitting: boolean; isValid: boolean }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="">Select tag</option>
              {tagOptions.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>
          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>Cancel</button>
            <button type="submit" className={css.submitButton} disabled={!isValid || isSubmitting || mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
