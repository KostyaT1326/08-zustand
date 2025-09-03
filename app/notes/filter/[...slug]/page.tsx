import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

type Props = { params: { slug: string[] } };

const NotesByTag = async ({ params }: Props) => {
  const resolvedParams = await params;
  const tag = resolvedParams.slug[0] === 'All' ? undefined : resolvedParams.slug[0] as NoteTag;
  
  const queryClient = new QueryClient();
  
  // Префетчимо дані на сервері
  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, search: '', tag }],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByTag;