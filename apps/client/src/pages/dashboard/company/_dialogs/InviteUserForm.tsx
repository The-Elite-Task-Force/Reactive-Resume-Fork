/* eslint-disable lingui/no-unlocalized-strings */
import { cn } from "@reactive-resume/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { inviteToCompany } from "@/client/services/company/company";

type InviteUserFormProps = {
  companyId: string;
};

const InviteUserForm: React.FC<InviteUserFormProps> = ({ companyId }) => {
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ companyId, username }: { companyId: string; username: string }) =>
      inviteToCompany({ companyId, username }),
    onSuccess: () => {
      setSuccess(true);
      setUsername("");
    },
    onError: () => {
      setSuccess(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    mutation.mutate({ companyId, username });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Invite User to Company
      </h2>
      {mutation.isError && (
        <p className="mb-4 text-red-500 dark:text-red-400">
          {mutation.error.message} Please try again.
        </p>
      )}
      {success && (
        <p className="mb-4 text-green-500 dark:text-green-400">User invited successfully!</p>
      )}
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <input
          required
          type="text"
          id="username"
          value={username}
          className={cn(
            "flex h-9 w-full rounded border bg-transparent px-3 py-0.5 !text-sm ring-0 ring-offset-transparent transition-colors",
            "[appearance:textfield] placeholder:opacity-80 hover:bg-secondary/20 focus:border-primary focus:bg-secondary/20",
            "focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            "file:border-0 file:bg-transparent file:pt-1 file:text-sm file:font-medium file:text-primary",
            mutation.isError ? "border-error" : "border-border",
          )}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        disabled={mutation.isPending}
      >
        {mutation.status === "pending" ? "Inviting..." : "Invite User"}
      </button>
    </form>
  );
};

export default InviteUserForm;
