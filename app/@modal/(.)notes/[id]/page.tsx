import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSingleNote } from '@/lib/api';
import NotePreview from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreviewPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const queryClient = new QueryClient();

  // Префетчимо дані нотатки на сервері
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  );
};

export default NotePreviewPage;