import { FC, memo } from "react";

import { Profile } from "../Profile";
import { Button } from "@/shared/ui/button";
import { ButtonThemes } from "@/shared/lib/enums";

// TODO mock
const activeLoans = [{ id: 1 }, { id: 2 }];

const ProfileActive: FC = () => {
  return (
    <Profile title="Активные заявки">
      <div className="flex flex-col gap-y-3 mb-6">
        {activeLoans?.length &&
          activeLoans.map((activeLoan: any) => (
            <ProfileActiveApplication key={activeLoan.id} loan={activeLoan} />
          ))}
      </div>
    </Profile>
  );
};

const ProfileActiveApplication: FC<{ loan?: any }> = memo(({ loan }) => {
  console.log(loan);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center p-4 border border-border-gray rounded-lg gap-4 lg:gap-10">
      <div className="flex items-start md:items-center flex-col md:flex-row flex-1 lg:flex-2 justify-between gap-2 md:gap-10">
        <span className="heading-5 text-nowrap">
          Займ на сумму <span className="text-nowrap">20 0000</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-nowrap heading-6">9039 ₽</span>
          <span className="text-nowrap text-small">До 13.05.2023</span>
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
