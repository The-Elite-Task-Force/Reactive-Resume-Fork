import type { CustomSectionGroup, SectionKey } from "@reactive-resume/schema";

export type TemplateProps = {
  columns: SectionKey[][];
  isFirstPage?: boolean;
};

export type SectionProps<T> = {
  section: T[] | CustomSectionGroup[];
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

export type SectionPropsDateKey<T> = {
  section: T[] | CustomSectionGroup[];
  children?: (item: T) => React.ReactNode;
  urlKey?: keyof T;
  dateKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};
