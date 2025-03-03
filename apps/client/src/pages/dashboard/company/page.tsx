import type { CompanyDto, EmployeeDto } from "@reactive-resume/dto";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

import { fetchEmployees } from "@/client/services/company/company";

import EmployeeList from "./employeeList";
import InviteUserForm from "./InviteUserForm";

export const CompanyPage = () => {
  const company: CompanyDto = useLoaderData();
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const employeesData = await fetchEmployees(company.id);
        setEmployees(employeesData);
      } catch (error) {
        console.error(error);
      }
    };

    void loadEmployees();
  }, [company.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{company.name}</h1>
      <EmployeeList employees={employees} />
      <InviteUserForm companyId={company.id} />
    </div>
  );
};
