'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';



const tagOptions: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];


import { useRouter } from 'next/navigation';

const NoteForm: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });


  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({
      ...draft,
  [name]: name === 'tag' ? (value as NoteTag) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          {tagOptions.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div className={css.actions}>
  <button type="button" className={css.cancelButton} onClick={() => router.back()}>Cancel</button>
  <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
