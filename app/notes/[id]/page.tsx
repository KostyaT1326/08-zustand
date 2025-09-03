import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "../[id]/NoteDetails.client";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const note = await getSingleNote(params.id);
  return {
    title: `Note: ${note.title} | NoteHub`,
    description: note.content.slice(0, 100),
    openGraph: {
      title: `Note: ${note.title} | NoteHub`,
      description: note.content.slice(0, 100),
      url: `https://notehub.goit.global/notes/${params.id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Note: ${note.title} | NoteHub`,
      description: note.content.slice(0, 100),
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;