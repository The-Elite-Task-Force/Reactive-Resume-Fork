import { t } from "@lingui/macro";
import { CompanyDto, CreateCompanyMappingDto, EmployeeDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { COMPANIES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchCompanies = async () => {
  const response = await axios.get<CompanyDto[], AxiosResponse<CompanyDto[]>>("/company");
  return response.data;
};

export const fetchCompany = async (companyId: string) => {
  const response = await axios.get<CompanyDto>(`/company/${companyId}`);
  return response.data;
};

export const useCompanies = () => {
  const {
    error,
    isPending: loading,
    data: companies,
  } = useQuery({
    queryKey: COMPANIES_KEY,
    queryFn: fetchCompanies,
  });
  return { companies, loading, error };
};

export const setDefault = async (data: { companyId: string; userId: string }) => {
  const response = await axios.patch(`/company/${data.companyId}/setDefault`, {
    userId: data.userId,
  });
  return response.data;
};

export const removeUserFromCompany = async (data: { companyId: string; userId: string }) => {
  const response = await axios.delete(`/company/${data.companyId}/removeUser/${data.userId}`);
  return response.data;
};

export const inviteUserToCompany = async (data: { companyId: string; username: string }) => {
  const response = await axios.post(`/company/${data.companyId}/invite`, {
    username: data.username,
  });
  return response.data;
};

export const fetchEmployees = async (companyId: string) => {
  const response = await axios.get<EmployeeDto[], AxiosResponse<EmployeeDto[]>>(
    `/company/${companyId}/employees`,
  );
  return response.data;
};

export const inviteToCompany = async (data: CreateCompanyMappingDto) => {
  try {
    const response = await axios.post<
      CreateCompanyMappingDto,
      AxiosResponse<CreateCompanyMappingDto>
    >(`/company/invite`, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return t`An unexpected error occurred`;
  }
};
