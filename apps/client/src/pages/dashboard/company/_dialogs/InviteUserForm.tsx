import { cn } from "@reactive-resume/utils";
import { useState } from "react";

import { inviteUserToCompany } from "@/client/services/company/company";

type InviteUserFormProps = {
  companyId: string;
};

const InviteUserForm: React.FC<InviteUserFormProps> = ({ companyId }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await inviteUserToCompany({ companyId, username });
      setSuccess(true);
      setUsername("");
    } catch (err) {
      setError("Failed to invite user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Invite User to Company
      </h2>
      {error && <p className="mb-4 text-red-500 dark:text-red-400">{error}</p>}
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
            error ? "border-error" : "border-border",
          )}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Inviting..." : "Invite User"}
      </button>
    </form>
  );
};

export default InviteUserForm;
