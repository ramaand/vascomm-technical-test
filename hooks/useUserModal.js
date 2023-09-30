import { create } from 'zustand'

const useUserModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isCreate: true, detail: null }),
  isCreate: true,
  setCreate: () => set({ isCreate: true }),
  setEdit: () => set({ isCreate: false }),
  detail: null,
  hasUpdate: false,
  openUpdate: () => set({ hasUpdate: true }),
  closeUpdate: () => set({ hasUpdate: false }),
}));

export default useUserModal;
