import { FC, useCallback, useRef, useState } from "react";
import {
  useNavigate,
  // useParams
} from "react-router-dom";

import { cn } from "@/shared/lib/cn";
import {
  ProfileMainApplicationSteps,
  ProfileMainApplicationWrapper,
} from "../ProfileMain";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { AppLink } from "@/shared/ui/app-link";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";
//import { useLoansData } from "@/pages/profile/lib/hooks";
import { Loader } from "@/shared/ui/loader";
import { useLocationIndex } from "@/pages/application/lib/hooks";

const ProfileMainSchedule: FC = () => {
  const [checked, setChecked] = useState(false);
  const { locationIndex } = useLocationIndex("profile");
  const navigate = useNavigate();

  const handleCheck = useCallback((state: boolean) => {
    setChecked(state);
  }, []);

  const refSchedule = useRef<HTMLDivElement | null>(null);
  useSwipe(refSchedule);

  //const { id } = useParams();

  //const { loans, isFetching } = useLoansData(id as string);
  // TODO удалить
  const isFetching = false;

  return (
    <>
      <ProfileMainApplicationWrapper>
        <ProfileMainApplicationSteps locationIndex={locationIndex} />
      </ProfileMainApplicationWrapper>
      <div className="max-w-[1000px] mx-auto pb-16">
        <h3 className="heading-5 mb-4 px-7 lg:px-0">
          Просмотрите график и подтвердите, что вам подходят условия
        </h3>
        <div className="flex justify-center">
          <div
            className="w-screen cursor-grab lg:cursor-auto grid grid-cols-[1fr] overflow-x-auto overflow-y-hidden no-scrollbar"
            ref={refSchedule}
          >
            <div className="place-items-center grid grid-cols-[auto_30px] lg:grid-cols-[auto]">
              <div className="border border-border-gray rounded-lg overflow-hidden mb-6 w-[1000px] ml-7 lg:ml-0">
                <table className="w-full">
                  <thead className="bg-bg-light-gray">
                    <tr className="text-small">
                      <td className="py-4 pl-4 text-left">№</td>
                      <td className="p-4 text-left">Дата платежа</td>
                      <td className="p-4 text-right">Сумма платежа</td>
                      <td className="p-4 text-right">Основной долг</td>
                      <td className="p-4 text-right">Проценты</td>
                      <td className="p-4 text-right">Ежемес. комиссии</td>
                      <td className="p-4 text-right">Остаток долга</td>
                    </tr>
                  </thead>
                  <tbody>{!isFetching && <ProfileMainScheduleRow />}</tbody>
                </table>
                {isFetching && <Loader className="flex justify-center" />}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 flex gap-2 px-7 lg:px-0">
          <Checkbox checked={checked} handleCheck={handleCheck} />
          <span>
            Я согласен с условиями{" "}
            <AppLink to="*" className="text-common-brand hover:underline">
              оферты
            </AppLink>
          </span>
        </div>
        <div className="px-7 lg:px-0">
          <Button
            className="btn-medium w-full"
            onClick={() => navigate("/profile/main/approved")}
            disabled={!checked}
          >
            Подтвердить и продолжить
          </Button>
        </div>
      </div>
    </>
  );
};

const ProfileMainScheduleRow: FC = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i, arr) => {
        const isLast = i === arr.length - 1;

        return (
          <tr
            key={i}
            className={cn("text-small  px-4", {
              "border-b border-border-gray": !isLast,
            })}
          >
            <td className="py-4 pl-4 text-left">1</td>
            <td className="p-4 text-left">3 января 2024 г.</td>
            <td className="p-4 text-right">17 520,14</td>
            <td className="p-4 text-right">3 437,90</td>
            <td className="p-4 text-right">14 000,00</td>
            <td className="p-4 text-right">83,33</td>
            <td className="p-4 text-right">196 562,20</td>
          </tr>
        );
      })}
    </>
  );
};

export default ProfileMainSchedule;
