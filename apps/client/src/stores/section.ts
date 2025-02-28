import type { SectionsDto } from "@reactive-resume/dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SectionsState = {
  sections: SectionsDto | null;
};

type SectionsActions = {
  setSections: (sections: SectionsDto | null) => void;
};

export const useSectionsStore = create<SectionsState & SectionsActions>()(
  persist(
    (set) => ({
      sections: null,
      setSections: (sections) => {
        set({ sections });
      },
    }),
    { name: "sections" },
  ),
);
