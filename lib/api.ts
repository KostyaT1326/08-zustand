import axios from "axios";
import type { Note, NoteTag } from '../types/note';

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = '', tag } = params;
  const queryParams: FetchNotesParams = { page, perPage, search };
  if (tag) queryParams.tag = tag;
  const response = await axiosInstance.get<FetchNotesResponse>('/notes', { params: queryParams });
  return response.data;
}

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: NoteTag;
}

export async function createNote(data: CreateNoteParams): Promise<Note> {
const response = await axiosInstance.post<Note>('/notes', data);
    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
const response = await axiosInstance.delete<Note>(`/notes/${id}`);
    return response.data;
}
  
export async function getSingleNote(id: string): Promise<Note> {
  const res = await axiosInstance.get<Note>(`/notes/${id}`);
  return res.data;
}