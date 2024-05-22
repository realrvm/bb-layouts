import { FC } from "react";

import { Download, Notes } from "@/shared/ui/icons";
import { Loader } from "@/shared/ui/loader";
import { AppLink } from "@/shared/ui/app-link";

import { useGetProfileAgreements } from "../../model/api/profileApi";
import { Profile, ProfileNotProvided } from "../Profile";
import { setAgreementsTitle } from "../../lib/helpers";

const ProfileDocs: FC = () => {
  const { data: docsData, isFetching, isSuccess } = useGetProfileAgreements();

  const { results: docs } = docsData || {};

  return (
    <Profile title="Документы">
      {isFetching && <Loader />}
      {isSuccess && docs && docs.length === 0 && (
        <ProfileNotProvided>Документы отсутствуют</ProfileNotProvided>
      )}
      {isSuccess && docs && docs.length > 0 ? (
        <div className="flex flex-col gap-3">
          {docs.map((doc) => {
            const { id, agreement_type, file } = doc;

            return (
              <div
                key={id}
                className="flex items-center p-4 border border-border-gray rounded-lg justify-between gap-2"
              >
                <div className="flex gap-2 items-center">
                  <Notes />
                  <span className="heading-5">
                    {`${setAgreementsTitle(agreement_type)} № ${id}`}
                  </span>
                </div>
                <AppLink
                  to={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn-small text-common-white flex items-center gap-1 heading-6 border border-border-gray rounded-lg bg-common-brand hover:bg-brand-secondary hover:disabled:bg-common-brand"
                >
                  <Download />
                  <span>Скачать</span>
                </AppLink>
              </div>
            );
          })}
        </div>
      ) : null}
    </Profile>
  );
};

export default ProfileDocs;
