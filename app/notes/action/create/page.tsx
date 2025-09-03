import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note and save your ideas.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note and save your ideas.',
    url: 'https://notehub.goit.global/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note',
      },
    ],
    type: 'website',
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
  <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
