import { t } from "@lingui/macro";
import { Plus, PlusCircle } from "@phosphor-icons/react";
import type {
  Award,
  Certification,
  CustomSection,
  Education,
  Experience,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  Skill,
  Volunteer,
} from "@reactive-resume/schema";
import { Button, ScrollArea, Separator } from "@reactive-resume/ui";
import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router";

import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { useResumeStore } from "@/client/stores/resume";
import { useSectionsStore } from "@/client/stores/section";

import { BasicsSection } from "./sections/basics";
import { SectionBase } from "./sections/shared/section-base";
import { SectionIcon } from "./sections/shared/section-icon";
import { SummarySection } from "./sections/summary";

export const LeftSidebar = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const addSection = useResumeStore((state) => state.addSection);
  const customSections = useResumeStore((state) => state.resume.data.sections.customs);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const sections = useSectionsStore((state) => state.sections);
  const setValue = useResumeStore((state) => state.setValue);
  const alue = useResumeStore((state) => state.resume.data);

  useEffect(() => {
    // Map sections from sectionsStore to the corresponding sections in resumeStore
    for (const [key, section] of Object.entries(sections)) {
      setValue(`sections.${key}.items`, section);
    }
  }, [sections, setValue]);

  console.log(alue)

  // const resume = useResumeStore((state) => state.resume);

  return (
    <div className="flex bg-secondary-accent/30">
      <div className="hidden basis-12 flex-col items-center justify-between bg-secondary-accent/30 py-4 sm:flex">
        <Button asChild size="icon" variant="ghost" className="size-8 rounded-full">
          <Link to="/dashboard">
            <Icon size={14} />
          </Link>
        </Button>

        <div className="flex flex-col items-center justify-center gap-y-2">
          <SectionIcon
            id="basics"
            name={t({
              message: "Basics",
              context:
                "The basics sectionItem of a resume consists of User's Picture, Full Name, Location etc.",
            })}
            onClick={() => {
              scrollIntoView("#basics");
            }}
          />
          <SectionIcon
            id="summaries"
            onClick={() => {
              scrollIntoView("#summary");
            }}
          />
          <SectionIcon
            id="profiles"
            onClick={() => {
              scrollIntoView("#profiles");
            }}
          />
          <SectionIcon
            id="experiences"
            onClick={() => {
              scrollIntoView("#experience");
            }}
          />
          <SectionIcon
            id="educations"
            onClick={() => {
              scrollIntoView("#education");
            }}
          />
          <SectionIcon
            id="skills"
            onClick={() => {
              scrollIntoView("#skills");
            }}
          />
          <SectionIcon
            id="languages"
            onClick={() => {
              scrollIntoView("#languages");
            }}
          />
          <SectionIcon
            id="awards"
            onClick={() => {
              scrollIntoView("#awards");
            }}
          />
          <SectionIcon
            id="certifications"
            onClick={() => {
              scrollIntoView("#certifications");
            }}
          />
          <SectionIcon
            id="interests"
            onClick={() => {
              scrollIntoView("#interests");
            }}
          />
          <SectionIcon
            id="projects"
            onClick={() => {
              scrollIntoView("#projects");
            }}
          />
          <SectionIcon
            id="publications"
            onClick={() => {
              scrollIntoView("#publications");
            }}
          />
          <SectionIcon
            id="volunteers"
            onClick={() => {
              scrollIntoView("#volunteer");
            }}
          />
          <SectionIcon
            id="references"
            onClick={() => {
              scrollIntoView("#references");
            }}
          />

          <SectionIcon
            id="customs"
            variant="outline"
            name={t`Add a new section`}
            icon={<Plus size={14} />}
            onClick={() => {
              addSection();
              // eslint-disable-next-line lingui/no-unlocalized-strings
              scrollIntoView("& > sectionItem:last-of-type");
            }}
          />
        </div>

        <UserOptions>
          <Button size="icon" variant="ghost" className="rounded-full">
            <UserAvatar size={28} />
          </Button>
        </UserOptions>
      </div>

      <ScrollArea orientation="vertical" className="h-screen flex-1 pb-16 lg:pb-0">
        <div ref={containterRef} className="grid gap-y-10 p-6 @container/left">
          <BasicsSection />
          <Separator />
          <SummarySection />
          <Separator />
          <SectionBase<Profile>
            id="profiles"
            title={(item) => item.network}
            description={(item) => item.username}
          />
          <Separator />
          <SectionBase<Experience>
            id="experiences"
            title={(item) => item.company}
            description={(item) => item.position}
          />
          <Separator />
          <SectionBase<Education>
            id="educations"
            title={(item) => item.institution}
            description={(item) => item.area}
          />
          <Separator />
          <SectionBase<Skill>
            id="skills"
            title={(item) => item.name}
            description={(item) => {
              if (item.description) return item.description;
              if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
            }}
          />
          <Separator />
          <SectionBase<Language>
            id="languages"
            title={(item) => item.name}
            description={(item) => item.description}
          />
          <Separator />
          <SectionBase<Award>
            id="awards"
            title={(item) => item.title}
            description={(item) => item.awarder}
          />
          <Separator />
          <SectionBase<Certification>
            id="certifications"
            title={(item) => item.name}
            description={(item) => item.issuer}
          />
          <Separator />
          <SectionBase<Interest>
            id="interests"
            title={(item) => item.name}
            description={(item) => {
              if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
            }}
          />
          <Separator />
          <SectionBase<Project>
            id="projects"
            title={(item) => item.name}
            description={(item) => item.description}
          />
          <Separator />
          <SectionBase<Publication>
            id="publications"
            title={(item) => item.name}
            description={(item) => item.publisher}
          />
          <Separator />
          <SectionBase<Volunteer>
            id="volunteers"
            title={(item) => item.organization}
            description={(item) => item.position}
          />
          <Separator />
          <SectionBase<Reference>
            id="references"
            title={(item) => item.name}
            description={(item) => item.description}
          />

          {/* Custom Sections */}
          {Object.values(customSections).map((section) => (
            <Fragment key={section.id}>
              <Separator />

              <SectionBase<CustomSection>
                id={`custom.${section.id}`}
                title={(item) => item.name}
                description={(item) => item.description}
              />
            </Fragment>
          ))}

          <Separator />

          <Button size="lg" variant="outline" onClick={addSection}>
            <PlusCircle />
            <span className="ml-2">{t`Add a new section`}</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};
