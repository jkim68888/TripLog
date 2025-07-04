import { create } from 'zustand';

interface PostStore {
  selectedImages: ImageWithMetadata[];
  setSelectedImages: (images: ImageWithMetadata[]) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  selectedImages: [],
  setSelectedImages: (images) => set({ selectedImages: images }),
}));

// 이미지 데이터 타입 정의
interface ImageWithMetadata {
  uri?: string;
  location?: {
    latitude: number | undefined;
    longitude: number | undefined;
    text?: string | undefined;
  };
  date?: Date | undefined;
  time?: Date | undefined;
  creationTime?: string | undefined;
  filename?: string;
}