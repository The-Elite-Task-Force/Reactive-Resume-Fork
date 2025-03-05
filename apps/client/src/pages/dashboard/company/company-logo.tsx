import type { CompanyDto } from "@reactive-resume/dto";
import { getInitials } from "@reactive-resume/utils";

type Props = {
  company: CompanyDto;
  size?: number;
  className?: string;
};

export const CompanyLogo = ({ company, size = 36, className }: Props) => {
  const style = { width: size, height: size };

  return (
    <div className={className}>
      {company.picture ? (
        <img alt={company.name} src={company.picture} className="rounded-full" style={style} />
      ) : (
        <div
          style={style}
          className="flex items-center justify-center rounded-full bg-secondary text-center text-[10px] font-semibold text-secondary-foreground"
        >
          {getInitials(company.name)}
        </div>
      )}
    </div>
  );
};
