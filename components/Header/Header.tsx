import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from '../TagsMenu/TagsMenu';

const tags = ['Work', 'Personal', 'Study', 'Meeting', 'Shopping', 'Todo'];

const Header = () => {
  return (
    <header className={css.header}>
  <Link href="/" aria-label="Home">
    NoteHub
  </Link>
  <nav aria-label="Main Navigation">
    <ul className={css.navigation}>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <TagsMenu tags={tags} />
      </li>
    </ul>
  </nav>
</header>

  )
}

export default Header


