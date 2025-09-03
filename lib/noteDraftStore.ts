import { create } from 'zustand';

type Draft = {
  title: string;
  content: string;
  tag: string;
};

interface NoteDraftStore {
  draft: Draft;
  setDraft: (draft: Partial<Draft>) => void;
  clearDraft: () => void;
}

export const useNoteDraftStore = create<NoteDraftStore>((set) => ({
  draft: { title: '', content: '', tag: '' },
  setDraft: (draft) => set((state) => ({ draft: { ...state.draft, ...draft } })),
  clearDraft: () => set({ draft: { title: '', content: '', tag: '' } }),
}));