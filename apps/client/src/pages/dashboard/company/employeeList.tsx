import type { EmployeeDto } from "@reactive-resume/dto";

import EmployeeCard from "./employeeCard";

type EmployeeListProps = {
  employees: EmployeeDto[];
};

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Employees</h2>
      <ul className="space-y-4">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
