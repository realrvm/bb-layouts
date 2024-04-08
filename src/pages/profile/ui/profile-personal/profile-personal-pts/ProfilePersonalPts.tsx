import { FC } from "react";

import { Profile, ProfileNotProvided } from "../../Profile";

const ProfilePersonalPts: FC = () => {
  // TODO проверка на наличие документа
  const hasPTSDocuments = true;

  return (
    <Profile title="ПТС" isReturn>
      {hasPTSDocuments ? (
        <div className="flex flex-col gap-6 p-6 border border-border-gray rounded-lg max-w-[472px]">
          <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Автомобиль</dt>
              <dd className="heading-4">Kia K5</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Категория ТС</dt>
              <dd>B</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Госномер</dt>
              <dd>А 654 МХ 27</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Номер кузова</dt>
              <dd>XYZ12-3456789</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Модель, № двигателя</dt>
              <dd>Отсутствует</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Номер шасси</dt>
              <dd>Отсутствует</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Год</dt>
              <dd>2019</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Масса автомобиля</dt>
              <dd>1410 кг</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Расположение руля</dt>
              <dd>правый руль</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Объем двигателя</dt>
              <dd>2994 куб. см</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Мощность</dt>
              <dd>210 л. с.</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Цвет кузова</dt>
              <dd>Серый</dd>
            </dl>
          </div>
        </div>
      ) : (
        <ProfileNotProvided />
      )}
    </Profile>
  );
};

export default ProfilePersonalPts;
