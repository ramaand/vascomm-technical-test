import { create } from 'zustand'

const useDeleteDialog = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, detail: null, api: '' }),
  detail: null,
  hasUpdate: false,
  openUpdate: () => set({ hasUpdate: true }),
  closeUpdate: () => set({ hasUpdate: false }),
  api: '',
}));

export default useDeleteDialog;
