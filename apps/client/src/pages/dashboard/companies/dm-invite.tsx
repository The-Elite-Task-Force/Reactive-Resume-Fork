import { t } from "@lingui/macro";
import { BuildingOffice } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@reactive-resume/ui";

import { inviteToCompany, useCompanies } from "@/client/services/company";
import { useAuthStore } from "@/client/stores/auth";

type Props = {
  invitedUserId: string;
};

export const DropdownCompanyInviter = ({ invitedUserId }: Props) => {
  const { user } = useAuthStore();

  const { companies, loading, error } = useCompanies();

  const onInvite = async (companyId: string) => {
    if (user) {
      try {
        await inviteToCompany({
          companyId: companyId,
          userId: invitedUserId,
        });
      } catch (error) {
        alert(t`Invitation failed: ${error}`);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-left">
        <BuildingOffice size={24} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem disabled>{t`Invite to:`}</DropdownMenuItem>

        {loading ? (
          <DropdownMenuItem disabled>{t`Loading...`}</DropdownMenuItem>
        ) : error ? (
          <DropdownMenuItem disabled>{t`Error loading companies`}</DropdownMenuItem>
        ) : // eslint-disable-next-line unicorn/no-nested-ternary
        companies?.length === 0 ? (
          <DropdownMenuItem disabled>{t`No companies found`}</DropdownMenuItem>
        ) : (
          companies?.map((company) => (
            <DropdownMenuItem key={company.id} onClick={() => onInvite(company.id)}>
              {company.name}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
