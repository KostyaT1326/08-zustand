'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

type Props = {
  tags: string[];
};

const TagsMenu = ({ tags }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href="/notes/filter/All" className={css.menuLink} onClick={closeMenu}>All</Link>
          </li>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={closeMenu}>{tag}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;