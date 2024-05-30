import { FC } from "react";
import { ProfileMainApplicationWrapper } from "../ProfileMain";

export const ProfileMainRefused: FC = () => {
  return (
    <ProfileMainApplicationWrapper>
      <div className="p-4 border border-border-gray rounded-lg w-full max-w-[824px]">
        <p className="text-center heading-5">
          К сожалению, ваша заявка на займ не одобрена
        </p>
      </div>
    </ProfileMainApplicationWrapper>
  );
};
