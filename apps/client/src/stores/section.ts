import type { SectionMappingDto, SectionsDto } from "@reactive-resume/dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SECTION_MAPPING_KEY } from "@/client/constants/query-keys";
import { queryClient } from "@/client/libs/query-client";

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

type MappingState = {
  mappings: SectionMappingDto;
};

type MappingsActions = {
  setMappings: (mappings: SectionMappingDto) => void;
};

export const useSectionMappingStore = create<MappingState & MappingsActions>()(
  persist(
    (set) => ({
      mappings: {} as SectionMappingDto,
      setMappings: (mappings) => {
        set({ mappings });
        // @ts-expect-error Produce error but works as intented
        void queryClient.invalidateQueries(SECTION_MAPPING_KEY);
      },
    }),
    { name: "mapping" },
  ),
);
