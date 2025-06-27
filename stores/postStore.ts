import { create } from 'zustand';

interface PostStore {
  selectedImages: string[];
  setSelectedImages: (images: string[]) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  selectedImages: [],
  setSelectedImages: (images) => set({ selectedImages: images }),
}));
