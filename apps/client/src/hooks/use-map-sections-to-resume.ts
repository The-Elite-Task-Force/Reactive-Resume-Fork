import { useEffect } from "react";

import { useResumeStore } from "../stores/resume";
import { useSectionsStore } from "../stores/section";

export const useMapSectionsToResume = () => {
  const sections = useSectionsStore((state) => state.sections);
  const setValue = useResumeStore((state) => state.setValue);
  useEffect(() => {
    // Map sections from sectionsStore to the corresponding sections in resumeStore
    for (const [key, section] of Object.entries(sections)) {
      setValue(`sections.${key}.items`, section);
    }
  }, [sections, setValue]);

  return { sections, setValue };
};
