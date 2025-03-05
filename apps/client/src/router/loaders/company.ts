import type { CompanyDto } from "@reactive-resume/dto";
import type { LoaderFunction } from "react-router";
import { redirect } from "react-router";

import { queryClient } from "@/client/libs/query-client";
import { fetchCompany } from "@/client/services/company";

export const companyLoader: LoaderFunction<CompanyDto> = async ({ params }) => {
  try {
    if (!params.id) return redirect("/dashboard/companies");
    const id: string = params.id;

    const result = await queryClient.fetchQuery({
      queryKey: ["company", { id }],
      queryFn: () => fetchCompany(id),
    });

    return result;
  } catch {
    return redirect("/dashboard/companies");
  }
};
