'use client';

import React, { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesClient.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import Link from 'next/link';

  type Props = {
    tag?: NoteTag;
  };

  const NotesClient = ({ tag }: Props) => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');

    React.useEffect(() => {
      const handler = setTimeout(() => {
        setQuery(searchInput);
        setPage(1);
      }, 400);
      return () => clearTimeout(handler);
    }, [searchInput]);

    const { data } = useQuery({
      queryKey: ['notes', page, query, tag],
      queryFn: () => fetchNotes({ page, search: query, tag }),
      placeholderData: keepPreviousData,
      refetchOnMount: false,
    });

    const pageCount = data?.totalPages || 0;

    return (
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchInput} onChange={setSearchInput} />
          {pageCount > 1 && (
            <Pagination
              page={page}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          )}
          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </header>
        {/* {tag && <h2>Notes with tag: {tag}</h2>} */}
        {data && Array.isArray(data.notes) && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>No notes found.</p>
        )}
  {/* Modal removed, note creation is now a separate page */}
      </div>
    );
  };

  export default NotesClient;
