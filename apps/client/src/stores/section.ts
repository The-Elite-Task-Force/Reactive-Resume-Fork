import type { SectionsDto } from "@reactive-resume/dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SectionsState = {
  sections: SectionsDto;
};

type SectionsActions = {
  setSections: (sections: SectionsDto) => void;
};

export const useSectionsStore = create<SectionsState & SectionsActions>()(
  persist(
    (set) => ({
      sections: {},
      setSections: (sections) => {
        set({ sections });
      },
    }),
    { name: "sections" },
  ),
);
