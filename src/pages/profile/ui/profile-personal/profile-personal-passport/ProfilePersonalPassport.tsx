import { FC } from "react";

import { Profile } from "../../Profile";

const ProfilePersonalPassport: FC = () => {
  return (
    <Profile title="Паспортные данные" isReturn>
      <div className="flex flex-col gap-6 p-6 border border-border-gray rounded-lg max-w-[472px]">
        <h4 className="heading-4">Игорёв Игорь Игоревич</h4>
        <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
          <dl className="flex flex-col g-1">
            <dt className="text-small text-text-gray">Пол</dt>
            <dd>Мужской</dd>
          </dl>
          <dl className="flex flex-col g-1">
            <dt className="text-small text-text-gray">Дата рождения</dt>
            <dd>11.02.1984</dd>
          </dl>
          <dl className="flex flex-col g-1">
            <dt className="text-small text-text-gray">Гражданство</dt>
            <dd>Россия</dd>
          </dl>
        </div>
        <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
          <dl className="flex flex-col g-1">
            <dt className="text-small text-text-gray">Место рождения</dt>
            <dd>
              Хабаровский край г. Хабаровск, Дикопольцева д. 5, кв. 11,
              Центральный район
            </dd>
          </dl>
        </div>
        <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
          <dl className="flex flex-col g-1">
            <dt className="text-small text-text-gray">
              Серия и номер паспорта
            </dt>
            <dd className="heading-5">0425 226644</dd>
          </dl>
        </div>
        <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
          <dl className="flex flex-col g-1">
            <dt className="text-small text-text-gray">Выдан</dt>
            <dd>
              Отделом УФМС России по Хабаровскому краю в Центральном районе гор.
              Хабаровска
            </dd>
          </dl>
        </div>
        <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
          <dl className="flex flex-col g-1">
            <dt className="text-small text-text-gray">Дата выдачи</dt>
            <dd>05.08.2000</dd>
          </dl>
        </div>
        <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
          <dl className="flex flex-col g-1">
            <dt className="text-small text-text-gray">Код подразделения</dt>
            <dd>270-001</dd>
          </dl>
        </div>
      </div>
    </Profile>
  );
};

export default ProfilePersonalPassport;
