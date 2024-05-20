import { FC, memo } from "react";

import { Profile, ProfileNotProvided } from "../Profile";
import { Button } from "@/shared/ui/button";
import { ButtonThemes } from "@/shared/lib/enums";
import { useGetActiveLoans } from "../../model/api/profileApi";
import { ActiveLoansResponseResultsSchema } from "../../model/types";
import { Loader } from "@/shared/ui/loader";

const ProfileActive: FC = () => {
  const {
    data: activeLoans,
    isFetching,
    isSuccess,
    isError,
  } = useGetActiveLoans();

  return (
    <Profile title="Активные заявки">
      {isFetching && <Loader />}
      <div className="flex flex-col gap-y-3 mb-6">
        {isSuccess && activeLoans?.results.length === 0 && (
          <ProfileNotProvided>
            У Вас нет ни одного активного займа.
          </ProfileNotProvided>
        )}
        {isSuccess &&
          activeLoans?.results.length &&
          activeLoans.results.map(
            (activeLoan: ActiveLoansResponseResultsSchema) => (
              <ProfileActiveApplication key={activeLoan.id} loan={activeLoan} />
            ),
          )}
      </div>
      {isError && (
        <div>
          При загрузке произошла ошибка. Попробуйте перезагрузить страницу
        </div>
      )}
    </Profile>
  );
};

const ProfileActiveApplication: FC<{ loan: ActiveLoansResponseResultsSchema }> =
  memo(({ loan }) => {
    const { expected_sum, appointed_sum, loaned_until } = loan;

    return (
      <div className="flex flex-col lg:flex-row lg:items-center p-4 border border-border-gray rounded-lg gap-4 lg:gap-10">
        <div className="flex items-start md:items-center flex-col md:flex-row flex-1 lg:flex-2 justify-between gap-2 md:gap-10">
          <span className="heading-5 text-nowrap">
            Займ на сумму <span className="text-nowrap">{appointed_sum}</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-nowrap heading-6">{expected_sum} ₽</span>
            <span className="text-nowrap text-small">До {loaned_until}</span>
          </div>
        </div>
        <div className="flex items-end lg:items-center md:justify-end lg:flex-3 gap-4">
          <Button
            variant={ButtonThemes.SECONDARY}
            className="btn-small flex-1 lg:flex-none"
            onClick={() => {}}
          >
            Подробнее
          </Button>
          <Button className="btn-small flex-1 lg:flex-none" onClick={() => {}}>
            Погасить
          </Button>
        </div>
      </div>
    );
  });

export default ProfileActive;
