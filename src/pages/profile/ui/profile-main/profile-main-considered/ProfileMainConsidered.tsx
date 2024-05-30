import { FC } from "react";
import { ProfileMainApplicationWrapper } from "../ProfileMain";

export const ProfileMainConsidered: FC = () => {
  return (
    <ProfileMainApplicationWrapper>
      <div className="p-4 border border-border-gray rounded-lg w-full max-w-[824px]">
        <p className="text-center heading-5">На рассмотрении</p>
        <p className="text-center">
          В течении 20 мин. вы получите SMS-оповещение
        </p>
      </div>
    </ProfileMainApplicationWrapper>
  );
};
