import { FC } from "react";
import { Profile } from "../Profile";
import { Button } from "@/shared/ui/button";
import { Download, Notes } from "@/shared/ui/icons";

const docs = [{ caption: "Договор залога" }, { caption: "Договор микрозайма" }];

const ProfileDocs: FC = () => {
  return (
    <Profile title="Документы">
      <div className="flex flex-col gap-3">
        {docs.map(({ caption }) => (
          <div className="flex items-center p-4 border border-border-gray rounded-lg justify-between gap-2">
            <div className="flex gap-2 items-center">
              <Notes />
              <span className="heading-5">{caption}</span>
            </div>
            <Button className="btn-small flex items-center gap-1 heading-6">
              <Download />
              <span>Скачать</span>
            </Button>
          </div>
        ))}
      </div>
    </Profile>
  );
};

export default ProfileDocs;
