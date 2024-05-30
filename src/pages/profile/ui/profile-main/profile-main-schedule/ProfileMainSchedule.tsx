import { FC, memo, useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { cn } from "@/shared/lib/cn";
import {
  ProfileMainApplicationSteps,
  ProfileMainApplicationWrapper,
} from "../ProfileMain";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { AppLink } from "@/shared/ui/app-link";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";
import { Loader } from "@/shared/ui/loader";
import { useLocationIndex } from "@/pages/application/lib/hooks";
import { useGetProfilePaymentsShedule } from "@/pages/profile/model/api/profileApi";
import { ProfileResponsePaymentsSheduleResultsSchema } from "@/pages/profile/model/types";
import { transformDate } from "@/shared/lib/helpers/transformDate";
import { formatNumber } from "@/shared/lib/helpers/formatNumber";
import { ButtonThemes } from "@/shared/lib/enums";

const ProfileMainSchedule: FC = () => {
  const [checked, setChecked] = useState(false);
  const { locationIndex } = useLocationIndex("profile");
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: paymentsSchedule, isFetching } = useGetProfilePaymentsShedule(
    id as string,
  );

  const handleCheck = useCallback((state: boolean) => {
    setChecked(state);
  }, []);

  const refSchedule = useRef<HTMLDivElement | null>(null);
  useSwipe(refSchedule);

  return (
    <>
      <ProfileMainApplicationWrapper>
        <ProfileMainApplicationSteps locationIndex={locationIndex} />
      </ProfileMainApplicationWrapper>
      <div className="max-w-[1000px] mx-auto pb-16">
        <ProfileMainScheduleNewOffer />
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
                  <tbody>
                    {!isFetching && (
                      <ProfileMainScheduleRows
                        payments={paymentsSchedule?.results}
                      />
                    )}
                  </tbody>
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

const ProfileMainScheduleRows: FC<{
  payments?: ProfileResponsePaymentsSheduleResultsSchema[];
}> = memo(({ payments }) => {
  return (
    <>
      {payments &&
        payments.map((payment, i, arr) => {
          const isLast = i === arr.length - 1;
          const {
            id,
            scheduled_at,
            sum,
            body,
            percents,
            commission,
            debt_balance,
          } = payment;

          return (
            <tr
              key={id}
              className={cn("text-small  px-4", {
                "border-b border-border-gray": !isLast,
              })}
            >
              <td className="py-4 pl-4 text-left">{i + 1}</td>
              <td className="p-4 text-left">{transformDate(scheduled_at)}</td>
              <td className="p-4 text-right">{formatNumber(sum)}</td>
              <td className="p-4 text-right">{formatNumber(body)}</td>
              <td className="p-4 text-right">{formatNumber(percents)}</td>
              <td className="p-4 text-right">{formatNumber(commission)}</td>
              <td className="p-4 text-right">{formatNumber(debt_balance)}</td>
            </tr>
          );
        })}
    </>
  );
});

const ProfileMainScheduleNewOffer: FC = memo(() => {
  return (
    <div className="mb-4 border border-border-gray rounded-lg p-6">
      <h4 className="heading-4 mb-2">Вам предложены новые условия</h4>
      <p className="mb-6 text-small">
        Возможно, эти условия окажутся более привлекательными для вас
      </p>
      <div className="flex items-center gap-4 mb-9">
        <div className="flex flex-col basis-[163px]">
          <span className="text-small text-text-gray">Сумма займа</span>
          <span className="heading-6 line-through">197 000 ₽</span>
          <span className="heading-5 text-special-green">250 000 ₽</span>
        </div>
        <div className="flex flex-col basis-[163px]">
          <span className="text-small text-text-gray">Срок</span>
          <span className="heading-6 line-through">24 месяца</span>
          <span className="heading-5 text-special-green">36 месяца</span>
        </div>
        <div className="flex flex-col basis-[163px]">
          <span className="text-small text-text-gray">Процентная ставка</span>
          <span className="heading-6 line-through">26%</span>
          <span className="heading-5 text-special-green">18%</span>
        </div>
        <div className="flex flex-col basis-[163px]">
          <span className="text-small text-text-gray">Обязательный платёж</span>
          <span className="heading-6 line-through">17 520,14 ₽</span>
          <span className="heading-5 text-special-green">8 194 ₽</span>
        </div>
      </div>
      <div className="flex item-center justify-between">
        <div className="flex gap-3">
          <Button onClick={() => {}}>Принять</Button>
          <Button onClick={() => {}} variant={ButtonThemes.DANGER}>
            Отказаться
          </Button>
        </div>
        <Button variant={ButtonThemes.SECONDARY} onClick={() => {}}>
          График платежей по новым условиям
        </Button>
      </div>
    </div>
  );
});

export default ProfileMainSchedule;
