import { t } from "@lingui/macro";
import type { ResumeDto, SectionMappingDto } from "@reactive-resume/dto";
import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import type { LoaderFunction } from "react-router";
import { redirect } from "react-router";

import { useMapSectionsToResume } from "@/client/hooks/use-map-sections-to-resume";
import { queryClient } from "@/client/libs/query-client";
import { findResumeById } from "@/client/services/resume";
import { useSections } from "@/client/services/section/sections";
import { useSectionMappings } from "@/client/services/section-mapping";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";
import { useSectionMappingStore } from "@/client/stores/section";

// @ts-expect-error Any type error
const mapSections = (sections, mapping: SectionMappingDto) => {
  const result = JSON.parse(JSON.stringify(sections));

  const sectionEntries = Object.entries(sections);
  sectionEntries.forEach((section) => {
    const key = section[0];
    // @ts-expect-error Unknown type
    const value = section[1].items;

    // @ts-expect-error Any type error
    result[key].items = value.filter((s: { id: string }) => mapping[key].includes(s.id));
  });

  return result;
};

export const BuilderPage = () => {
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);

  const resume = useResumeStore((state) => state.resume);
  const title = useResumeStore((state) => state.resume.title);
  const mappings = useSectionMappingStore((state) => state.mappings);
  const setMappings = useSectionMappingStore((state) => state.setMappings);

  useSectionMappings(resume.id);
  useSections();

  useMapSectionsToResume();

  const syncResumeToArtboard = useCallback(() => {
    if (Object.values(mappings).length === 0) {
      return;
    }

    setImmediate(() => {
      if (!frameRef?.contentWindow) return;
      const message = {
        type: "SET_RESUME",
        payload: {
          basics: resume.data.basics,
          sections: mapSections(resume.data.sections, mappings),
          metadata: resume.data.metadata,
        },
      };
      frameRef.contentWindow.postMessage(message, "*");
    });
  }, [frameRef?.contentWindow, resume.data, mappings, setMappings]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;

    frameRef.addEventListener("load", syncResumeToArtboard);

    return () => {
      frameRef.removeEventListener("load", syncResumeToArtboard);
    };
  }, [frameRef, mappings, setMappings]);

  // Persistently check if iframe has loaded using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      if (frameRef?.contentWindow?.document.readyState === "complete") {
        syncResumeToArtboard();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [frameRef, mappings, setMappings]);

  // Send resume data to iframe on change of resume data
  useEffect(syncResumeToArtboard, [resume.data, mappings, setMappings]);

  return (
    <>
      <Helmet>
        <title>
          {title} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <iframe
        ref={setFrameRef}
        title={resume.id}
        src="/artboard/builder"
        className="mt-16 w-screen"
        style={{ height: `calc(100vh - 64px)` }}
      />
    </>
  );
};

export const builderLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = params.id!;

    const resume = await queryClient.fetchQuery({
      queryKey: ["resume", { id }],
      queryFn: () => findResumeById({ id }),
    });

    useResumeStore.setState({ resume });
    useResumeStore.temporal.getState().clear();

    return resume;
  } catch {
    return redirect("/dashboard");
  }
};
