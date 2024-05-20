import { FC } from "react";

import { getGender } from "@/shared/lib/helpers/getGender";

import { Profile, ProfileNotProvided } from "../../Profile";
import { useGetProfileIdentity } from "@/pages/profile/model/api/profileApi";

const ProfilePersonalPassport: FC = () => {
  const { data: identity } = useGetProfileIdentity();
  const identity_documents = identity?.results[0];

  const hasIdentityDocuments =
    identity?.results && identity?.results?.length > 0;

  const {
    first_name,
    citizenship,
    last_name,
    patronymic,
    sex,
    date_of_birth,
    place_of_birth,
    series,
    number,
    name_of_issuer,
    date_of_issue,
    subdivision_code,
  } = (hasIdentityDocuments && identity_documents) || {};

  return (
    <Profile title="Паспортные данные" isReturn>
      {hasIdentityDocuments ? (
        <div className="flex flex-col gap-6 p-6 border border-border-gray rounded-lg max-w-[472px]">
          <h4 className="heading-4">{`${first_name} ${last_name} ${patronymic}`}</h4>
          <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Пол</dt>
              <dd>{getGender(sex)}</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Дата рождения</dt>
              <dd>{date_of_birth}</dd>
            </dl>
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Гражданство</dt>
              <dd>{citizenship}</dd>
            </dl>
          </div>
          <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Место рождения</dt>
              <dd>{place_of_birth}</dd>
            </dl>
          </div>
          <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">
                Серия и номер паспорта
              </dt>
              <dd className="heading-5">{`${series} ${number}`}</dd>
            </dl>
          </div>
          <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Выдан</dt>
              <dd>{name_of_issuer}</dd>
            </dl>
          </div>
          <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Дата выдачи</dt>
              <dd>{date_of_issue}</dd>
            </dl>
          </div>
          <div className="flex items-center justify-between gap-x-6 gap-y-9 flex-wrap">
            <dl className="flex flex-col g-1">
              <dt className="text-small text-text-gray">Код подразделения</dt>
              <dd>{subdivision_code}</dd>
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

export default ProfilePersonalPassport;
