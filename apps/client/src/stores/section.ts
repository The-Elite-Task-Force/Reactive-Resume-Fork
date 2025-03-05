import type { SectionMappingDto, SectionsDto } from "@reactive-resume/dto";
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
      sections: {} as SectionsDto,
      setSections: (sections) => {
        set({ sections });
      },
    }),
    { name: "sections" },
  ),
);

type MappingsState = {
  mappings: SectionMappingDto;
};

type MappingsActions = {
  setMappings: (mappings: SectionMappingDto) => void;
};

export const useSectionMappingStore = create<MappingsState & MappingsActions>()(
  persist(
    (set) => ({
      mappings: {} as SectionMappingDto,
      setMappings: (mappings) => {
        set({ mappings });
      },
    }),
    { name: "mappings" },
  ),
);
