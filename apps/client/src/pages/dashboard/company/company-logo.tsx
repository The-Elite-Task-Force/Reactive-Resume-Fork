import type { CompanyDto } from "@reactive-resume/dto";
import { getInitials } from "@reactive-resume/utils";

type Props = {
  company: CompanyDto;
  size?: number;
  className: string;
};

export const CompanyLogo = ({ company, size = 36, className }: Props) => {
  let picture: React.ReactNode;

  if (company.picture) {
    picture = (
      <img
        alt={company.name}
        src={company.picture}
        className="rounded-full"
        style={{ width: size, height: size }}
      />
    );
  } else {
    const initials = getInitials(company.name);

    picture = (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full bg-secondary text-center text-[10px] font-semibold text-secondary-foreground"
      >
        {initials}
      </div>
    );
  }

  return <div className={className}>{picture}</div>;
};
