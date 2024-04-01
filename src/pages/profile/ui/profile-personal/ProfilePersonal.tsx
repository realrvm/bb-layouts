import { FC, memo } from "react";
import { Profile } from "../Profile";
import { Button } from "@/shared/ui/button";
import { ButtonThemes } from "@/shared/lib/enums";
import { useNavigate } from "react-router-dom";

const personalItems = [
  { caption: "Паспортные данные", path: "passport" },
  { caption: "ПТС", path: "pts" },
  { caption: "Банковская карта", path: "card" },
];

const ProfilePersonal: FC = () => {
  return (
    <Profile title="Персональные данные">
      <div className="flex flex-col gap-3">
        {personalItems.map(({ caption, path }) => (
          <ProfilePersonalItem key={caption} caption={caption} path={path} />
        ))}
      </div>
    </Profile>
  );
};

const ProfilePersonalItem: FC<{ caption: string; path: string }> = memo(
  ({ caption, path }) => {
    const navigate = useNavigate();

    return (
      <div className="flex items-center p-4 border border-border-gray rounded-lg justify-between gap-2">
        <span className="heading-5">{caption}</span>
        <Button
          variant={ButtonThemes.SECONDARY}
          className="btn-small"
          onClick={() => navigate(`/profile/personal/${path}`)}
        >
          Подробнее
        </Button>
      </div>
    );
  },
);

export default ProfilePersonal;
