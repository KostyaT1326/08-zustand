"use client";

import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";

type Props = {
  noteId: string;
};

const NotePreview = ({ noteId }: Props) => {
  const router = useRouter();
  const handleClose = () => router.back();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getSingleNote(noteId),
    refetchOnMount: false,
  });

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={handleClose}>Назад</button>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading note.</p>}
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NotePreview;