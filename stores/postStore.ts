import { create } from 'zustand';

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

interface PostData {
  id: string;                  
  images: ImageWithMetadata[];
  content: string;
  hashtags: string[];
  creationDate: Date;
}

interface PostStore {
  currentPost: PostData;
  selectedImages: ImageWithMetadata[];
  posts: PostData[];

  // Actions
  setSelectedImages: (images: ImageWithMetadata[]) => void;
  setPostContent: (content: string) => void;
  setPostHashtags: (hashtags: string[]) => void;
  resetCurrentPost: () => void;
  addPost: (post: PostData) => void;
  deletePost: (id: string) => void; 
}

const initialPostData: PostData = {
  id: '',
  images: [],
  content: '',
  hashtags: [],
  creationDate: new Date(),
};

export const usePostStore = create<PostStore>((set) => ({
  // State
  currentPost: initialPostData,
  selectedImages: [],
  posts: [],

  // Actions
  setSelectedImages: (images) => set({ selectedImages: images }),
  
  setPostContent: (content) => set((state) => ({
    currentPost: { ...state.currentPost, content }
  })),
  
  setPostHashtags: (hashtags) => set((state) => ({
    currentPost: { ...state.currentPost, hashtags }
  })),
  
  resetCurrentPost: () => set({
    currentPost: { 
      ...initialPostData, 
      id: Date.now().toString(), // 새로운 ID 생성,
      creationDate: new Date() 
    },
    selectedImages: []
  }),
  
  addPost: (post) => set((state) => ({
    posts: [...state.posts, { ...post, id: Date.now().toString() }] // ID 자동 생성
  })),
  
  deletePost: (id) => set((state) => ({
    posts: state.posts.filter(post => post.id !== id)
  })),
}));

export type { ImageWithMetadata, PostData };
