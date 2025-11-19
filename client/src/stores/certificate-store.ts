import { create } from "zustand";
import { Certificate } from "@schemas";

interface CertificateStore {
  store: Certificate[];
  reset: () => void;
  replace: (certificates: Certificate[]) => void;
  add: (c: Certificate) => void;
  remove: (idx: number) => void;
  update: (idx: number, c: Certificate) => void;
}

export const useCertificateStore = create<CertificateStore>((set) => ({
  store: [],
  reset: () => set({ store: [] }),

  add: (c: Certificate) => set(state => {
    return {
      store: [
        ...state.store,
        c
      ]
    }
  }),

  update: (idx: number, c: Certificate) => set(state => {
    return {
      store: state.store.map((item, i) => {
        return i === idx ? c : item;
      })
    }
  }),

  remove: (idx: number) => set(state => {
    return {
      store: state.store.filter((_, i) => i !== idx)
    }
  }),

  replace: (certificates: Certificate[]) => set(state => {
    return {
      store: certificates
    }
  })
}));
