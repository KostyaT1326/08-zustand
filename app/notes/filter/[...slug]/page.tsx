import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const resolvedParams = await params;
  const filter = resolvedParams.slug?.join(", ") || "All notes";
  return {
    title: `Notes: ${filter} | NoteHub`,
    description: `Browse notes filtered by: ${filter}.`,
    openGraph: {
      title: `Notes: ${filter} | NoteHub`,
      description: `Browse notes filtered by: ${filter}.`,
      url: `https://notehub.goit.global/notes/filter/${resolvedParams.slug?.join("/")}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filter: ${filter}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes: ${filter} | NoteHub`,
      description: `Browse notes filtered by: ${filter}.`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

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