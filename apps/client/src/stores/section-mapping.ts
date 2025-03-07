import type { SectionMappingDto } from "@reactive-resume/dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      },
    }),
    { name: "mapping" },
  ),
);
