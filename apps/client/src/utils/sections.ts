import type { ResumeDto } from "@reactive-resume/dto";
import { SectionFormat, type SectionsDto } from "@reactive-resume/dto";
import { SectionKey } from "@reactive-resume/schema";

// This function maps SectionsDto from sections store to the format expected in resume.data.sections
export function mapSectionsToResume(
  sections: SectionsDto,
  currentSections: Partial<ResumeDto["data"]["sections"]>,
): Partial<ResumeDto["data"]["sections"]> {
  const mappedSections: Partial<ResumeDto["data"]["sections"]> = { ...currentSections };

  const sectionKeys = [
    "basics",
    "summaries",
    "awards",
    "certifications",
    "educations",
    "experiences",
    "volunteers",
    "interests",
    "languages",
    "profiles",
    "projects",
    "publications",
    "references",
    "skills",
    // "customs",
  ] as const;

  for (const key of sectionKeys) {
    switch (key) {
      case SectionFormat.Basics: {
        const sectionItems = sections[key];
        mappedSections.basics = { id: "basics", items: sectionItems };
        break;
      }
      case SectionFormat.Summaries: {
        const sectionItems = sections[key];
        mappedSections.summaries = { id: "summary", items: sectionItems };
        break;
      }
      case SectionFormat.Awards: {
        const sectionItems = sections[key];
        mappedSections.awards = { id: "awards", items: sectionItems };
        break;
      }
      case SectionFormat.Certifications: {
        const sectionItems = sections[key];
        mappedSections.certifications = { id: "certifications", items: sectionItems };
        break;
      }
      case SectionFormat.Educations: {
        const sectionItems = sections[key];
        mappedSections.educations = { id: "education", items: sectionItems };
        break;
      }
      case SectionFormat.Experiences: {
        const sectionItems = sections[key];
        mappedSections.experiences = { id: "experience", items: sectionItems };
        break;
      }
      case SectionFormat.Volunteers: {
        const sectionItems = sections[key];
        mappedSections.volunteers = { id: "volunteer", items: sectionItems };
        break;
      }
      case SectionFormat.Interests: {
        const sectionItems = sections[key];
        mappedSections.interests = { id: "interests", items: sectionItems };
        break;
      }
      case SectionFormat.Languages: {
        const sectionItems = sections[key];
        mappedSections.languages = { id: "languages", items: sectionItems };
        break;
      }
      case SectionFormat.Profiles: {
        const sectionItems = sections[key];
        mappedSections.profiles = { id: "profiles", items: sectionItems };
        break;
      }
      case SectionFormat.Projects: {
        const sectionItems = sections[key];
        mappedSections.projects = {
          id: "projects", // Ensure id is always set
          name: currentSections[key]?.name ?? "Projects",
          columns: currentSections[key]?.columns ?? 2,
          separateLinks: currentSections[key]?.separateLinks ?? false,
          items: sectionItems,
        };
        break;
      }
      case SectionFormat.Publications: {
        const sectionItems = sections[key];
        mappedSections.publications = { id: "publications", items: sectionItems };
        break;
      }
      case SectionFormat.References: {
        const sectionItems = sections[key];
        mappedSections.references = { id: "references", items: sectionItems };
        break;
      }
      case SectionFormat.Skills: {
        const sectionItems = sections[key];
        mappedSections.skills = { id: "skills", items: sectionItems };
        break;
      }
    }
  }

  // Handle customs separately (converting array to record)
  if (sections.customs) {
    mappedSections.customs = {};

    for (const customSection of sections.customs) {
      mappedSections.customs[customSection.id] = customSection;
    }
  }

  return mappedSections;
}
