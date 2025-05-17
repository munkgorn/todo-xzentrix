import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  title: '',
  content: null,
  show: ({ title, content }) => set({ isOpen: true, title, content }),
  hide: () => set({ isOpen: false, title: '', content: null }),
}));

export { useModalStore };
