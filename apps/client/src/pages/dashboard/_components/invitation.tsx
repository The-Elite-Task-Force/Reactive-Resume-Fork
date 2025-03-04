/* eslint-disable lingui/no-unlocalized-strings */
import { COMPANY_STATUS } from "@reactive-resume/dto";
import React from "react";

import { changeEmploymentStatus } from "@/client/services/company";
import formatDate from "@/client/utils/misc";

type InviteProps = {
  companyMappingId: string;
  invitedAt: string;
  companyName: string;
};

const handleAccept = async (companyMappingId: string, status: COMPANY_STATUS) => {
  try {
    await changeEmploymentStatus(companyMappingId, status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

const handleReject = async (companyMappingId: string, status: COMPANY_STATUS) => {
  try {
    await changeEmploymentStatus(companyMappingId, status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

const Invitation: React.FC<InviteProps> = ({ companyMappingId, invitedAt, companyName }) => {
  return (
    <div
      key={companyMappingId}
      className="mb-4 flex flex-col space-y-4 rounded-lg border border-white p-4 shadow-lg"
    >
      <h3 className="text-center text-xl font-semibold text-white">{companyName}</h3>
      <p className="text-sm text-white">Sent at: {formatDate(invitedAt)}</p>
      <div className="flex space-x-4">
        <button
          className="rounded-lg bg-green-900 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={async () => {
            await handleAccept(companyMappingId, COMPANY_STATUS.ACCEPTED);
          }}
        >
          Accept
        </button>
        <button
          className="rounded-lg bg-red-900 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={async () => {
            await handleReject(companyMappingId, COMPANY_STATUS.REJECTED);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default Invitation;
