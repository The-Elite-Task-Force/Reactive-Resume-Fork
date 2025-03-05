import type { SectionMappingDto, SectionsDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useEffect } from "react";

import { SECTION_MAPPING_KEY, SECTIONS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";
import { useSectionMappingStore, useSectionsStore } from "@/client/stores/section";

export const fetchSections = async () => {
  const response = await axios.get<SectionsDto, AxiosResponse<SectionsDto>>("/sectionItem");
  return response.data;
};

export const useSections = () => {
  const setSections = useSectionsStore((state) => state.setSections);

  const {
    error,
    isPending: loading,
    data: sections,
  } = useQuery({
    queryKey: SECTIONS_KEY,
    queryFn: fetchSections,
  });

  useEffect(() => {
    if (sections) {
      setSections(sections);
    }
  }, [sections, setSections]);

  return { sections, loading, error };
};

export const fetchSectionMappings = async (id: string) => {
  const response = await axios.get<SectionMappingDto, AxiosResponse<SectionMappingDto>>(
    `/sectionItem/mappings/${id}`,
  );

  return response.data;
};

export const useSectionMappings = (id: string) => {
  const setSectionMappings = useSectionMappingStore((state) => state.setMappings);

  const {
    error,
    isPending: loading,
    data: mappings,
  } = useQuery({
    queryKey: SECTION_MAPPING_KEY,
    queryFn: () => fetchSectionMappings(id),
  });

  useEffect(() => {
    if (mappings) {
      setSectionMappings(mappings);
    }
  }, [mappings, setSectionMappings]);

  return { mappings, loading, error };
};
