import { FC, PropsWithChildren, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Profile, ProfileNotProvided, ProfileReturnButton } from "../Profile";
import { Button } from "@/shared/ui/button";
import { ButtonThemes } from "@/shared/lib/enums";
import { cn } from "@/shared/lib/cn";
import { convertISOtoLocaleDate } from "@/shared/lib/helpers/convertISOtoLocaleDate";
import { useIsMobile } from "@/widgets/header/lib/hooks";
import { ProfileHeader } from "@/widgets/header";
import { Container } from "@/widgets/container";
import { useLoansData } from "../../lib/hooks";

import styles from "./styles.module.css";
import { getStatusState } from "@/shared/lib/helpers/getStatusState";
import { formatNumber } from "@/shared/lib/helpers/formatNumber";
import { Loader } from "@/shared/ui/loader";

type ProfileMainApplicationProps = {
  loan: {
    id: number;
    expected_sum: string;
    created_at: string;
    status: string;
  };
};

const ProfileMain: FC = () => {
  const { loans, isFetching, isSuccess, isError } = useLoansData();

  return (
    <Profile title="Заявки">
      <div className="flex flex-col gap-y-3 mb-6">
        {isFetching && <Loader />}
        {loans?.results &&
          loans.results.length > 0 &&
          isSuccess &&
          loans.results.map((loan) => (
            <ProfileMainApplication key={loan.id} loan={loan} />
          ))}
        {isSuccess && loans?.results && loans.results.length === 0 && (
          <ProfileNotProvided>У Вас нет ни одной заявки.</ProfileNotProvided>
        )}
        {isError && <p className="ml-10">Ошибка сервера</p>}
      </div>
    </Profile>
  );
};

const ProfileMainApplication: FC<ProfileMainApplicationProps> = memo(
  ({ loan }) => {
    const { id, expected_sum, created_at, status } = loan;
    const localDate = convertISOtoLocaleDate(created_at);
    const navigate = useNavigate();

    return (
      <div className="flex items-end md:items-center p-4 border border-border-gray rounded-lg gap-4 md:gap-10">
        <div className="flex items-start md:items-center flex-col md:flex-row flex-1 md:flex-2 justify-between gap-4 md:gap-6">
          <span className="heading-5 md:order-last">
            Займ на сумму{" "}
            <span className="text-nowrap">{formatNumber(expected_sum)} ₽</span>
          </span>
          <span
            className={cn(
              "py-1 px-2 text-small rounded-lg text-nowrap",
              getStatusState(status)[1],
            )}
          >
            {getStatusState(status)[0]}
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between flex-initial md:flex-3 gap-4">
          <span className="text-small md:text-medium">{localDate}</span>
          <Button
            variant={ButtonThemes.SECONDARY}
            className="btn-small"
            onClick={() => navigate(`/profile/main/${id}/schedule`)}
          >
            Подробнее
          </Button>
        </div>
      </div>
    );
  },
);

export const ProfileMainApplicationWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  const { isMobile } = useIsMobile();

  return (
    <>
      <ProfileHeader />
      <Container>
        <section className="flex flex-col items-center">
          <div className="flex items-center mb-3 w-full">
            <ProfileReturnButton path="/profile/main">
              К заявкам
            </ProfileReturnButton>
            <span
              className={cn(
                "py-1 px-2 text-small rounded-lg mx-auto",
                "bg-special-green-light text-special-green-medium",
                `${!isMobile ? "-translate-x-[58px]" : "-translate-x-[17px]"}`,
              )}
            >
              Одобрена
            </span>
          </div>
          <div className="flex justify-center items-center gap-3 mb-9">
            <h2 className="heading-3 md:heading-title text-center">
              Заявка на займ
            </h2>
            <span className={styles["loan-info--icon"]} data-hint=""></span>
          </div>
          {children}
        </section>
      </Container>
    </>
  );
};

export const ProfileMainApplicationSteps: FC<{ locationIndex: number }> = memo(
  ({ locationIndex }) => {
    return (
      <div className="grid grid-cols-3 md:flex md:flex-center items-start  md:items-center mx-auto mb-9 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <ProfileMainApplicationStep
            key={i}
            locationIndex={locationIndex}
            serialIndex={i}
          />
        ))}
      </div>
    );
  },
);

const ProfileMainApplicationStep: FC<{
  locationIndex: number;
  serialIndex: number;
}> = memo(({ locationIndex, serialIndex }) => {
  const caption = useMemo(
    () => [
      "Подтверждение графика платежей",
      "Прикрепление документов",
      "Получение денег",
    ],
    [],
  );

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-y-2 gap-x-1">
        <div className="flex items-center relative">
          {serialIndex > 0 && (
            <span className="w-9 md:w-5 h-0.5 bg-brand-light mr-3 absolute right-8"></span>
          )}
          <span
            className={cn(
              "h-9 w-9 rounded-full heading-5 grid place-items-center bg-brand-light text-common-brand",
              {
                "text-common-white bg-common-brand":
                  locationIndex === serialIndex + 1,
              },
            )}
          >
            {serialIndex + 1}
          </span>
        </div>
        <span className="text-[12px] md:text-small text-center md:mr-7 md:ml-3">
          {caption[serialIndex]}
        </span>
      </div>
    </>
  );
});

export default ProfileMain;
