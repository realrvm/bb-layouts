import { FC } from "react";

import { Profile, ProfileNotProvided } from "../../Profile";
import { useGetProfileVehicle } from "@/pages/profile/model/api/profileApi";

const ProfilePersonalPts: FC = () => {
  const { data: vehicle } = useGetProfileVehicle();
  const vehicleDocuments = vehicle?.results[0];

  const hasVehicleDocuments = vehicle?.results && vehicle.results.length > 0;

  const {
    vehicle: vehicleData,
    category,
    body_number,
    engine_model_number,
    frame_number,
    free_weight,
    engine_volume,
    engine_power,
    body_color,
  } = (hasVehicleDocuments && vehicleDocuments) || {};

  return (
    <Profile title="ПТС" isReturn>
      {hasVehicleDocuments ? (
        <div className="flex flex-col gap-6 p-6 border border-border-gray rounded-lg max-w-[472px]">
          <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Автомобиль</dt>
              <dd className="heading-4">
                {vehicleData?.model.make.name} {vehicleData?.model.name}
              </dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Категория ТС</dt>
              <dd>{category}</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Госномер</dt>
              <dd>{vehicleData?.plate}</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Номер кузова</dt>
              <dd>{body_number}</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Модель, № двигателя</dt>
              <dd>{engine_model_number}</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Номер шасси</dt>
              <dd>{frame_number}</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Год</dt>
              <dd>{vehicleData?.manufacture_year}</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Масса автомобиля</dt>
              <dd>{free_weight}</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Расположение руля</dt>
              <dd>-</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Объем двигателя</dt>
              <dd>{engine_volume}</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Мощность</dt>
              <dd>{engine_power}</dd>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-9">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Цвет кузова</dt>
              <dd>{body_color}</dd>
            </dl>
          </div>
        </div>
      ) : (
        <ProfileNotProvided>
          Данные ещё не предоставлены пользователем
        </ProfileNotProvided>
      )}
    </Profile>
  );
};

export default ProfilePersonalPts;
