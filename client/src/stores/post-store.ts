import { create } from "zustand";
import { IPost } from "../types";

interface PostState {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
  removePost: (postId: number | string) => void;
  totalPages: number;
  setTotalPages: (count: number) => void;
}

export const usePostStore = create<PostState>()((set) => ({
  posts: [],
  setPosts: (posts) => set(() => ({ posts })),
  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
  totalPages: 0,
  setTotalPages: (count) => set(() => ({ totalPages: count })),
}));
