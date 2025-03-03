import type { CompanyDto } from "@reactive-resume/dto";
import { useLoaderData } from "react-router";
import { FormField, FormItem, FormLabel } from "@reactive-resume/ui";

export const CompanyPage = () => {
  const company: CompanyDto = useLoaderData();

  return (
    <div>
      <h1>{company.name}</h1>
    </div>
  );
};
