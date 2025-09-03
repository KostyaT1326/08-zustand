import Link from 'next/link';
import { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';

const SidebarNotes = () => {

  const fixedTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/All" className={css.menuLink}>All</Link>
      </li>
      {fixedTags.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;