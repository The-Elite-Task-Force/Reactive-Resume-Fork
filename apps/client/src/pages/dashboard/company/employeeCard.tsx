/* eslint-disable no-console */
import type { EmployeeDto } from "@reactive-resume/dto";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

type EmployeeCardProps = {
  employee: EmployeeDto;
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleRemoveUser = () => {
    // Placeholder function for removing user
    console.log(`Removing user: ${employee.username}`);
  };

  const handleAssignRole = () => {
    // Placeholder function for assigning role
    console.log(`Assigning role to user: ${employee.username}`);
  };

  const handleViewProfile = () => {
    // Redirect to the public profile page
    navigate(`/publicprofile/${employee.username}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <li className="flex items-center space-x-4">
      <div className="shrink-0">
        <img
          className="size-10 rounded-full"
          src={`https://avatars.dicebear.com/api/initials/${employee.username}.svg`}
          alt={employee.username}
        />
      </div>
      <div className="flex-1">
        <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {employee.username}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</div>
        {employee.role && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Role: {employee.role.join(", ")}
          </div>
        )}
      </div>
      <div ref={dropdownRef} className="relative">
        <button
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
        >
          ...
        </button>
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <li>
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={handleViewProfile}
              >
                View Profile
              </button>
            </li>
            <li>
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={handleAssignRole}
              >
                Assign Role
              </button>
            </li>
            <li>
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={handleRemoveUser}
              >
                Remove User
              </button>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
};

export default EmployeeCard;
