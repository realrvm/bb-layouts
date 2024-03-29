import { FC } from "react";

import { useProfile } from "@/pages/profile";
import { Profile } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

function phoneNumberMask(phoneNumber?: string) {
  return phoneNumber?.replace(
    /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
    "$1 $2 $3 $4 $5",
  );
}

export const ProfileIconPhone: FC<{ className?: string }> = ({
  className = "hidden",
}) => {
  const { phone_number } = useProfile(undefined, {
    selectFromResult: ({ currentData }) => ({
      phone_number: currentData?.phone_number,
    }),
  });

  return (
    <div className={cn("md:flex items-center gap-2", className)}>
      <Profile />
      <span>{phoneNumberMask(phone_number) || "XXX-XXX-XXXX"}</span>
    </div>
  );
};
