import { FC, useCallback, useState } from "react";
import { Profile } from "../Profile";
import { Button } from "@/shared/ui/button";
import { ButtonThemes } from "@/shared/lib/enums";
import { Checkbox } from "@/shared/ui/checkbox";
import { useNavigate } from "react-router-dom";

const client = { phone_number: "+7 924 225 92 27", email: "" };

const ProfileClient: FC = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheck = useCallback((state: boolean) => {
    setChecked(state);
  }, []);

  return (
    <Profile title="Профиль">
      <div className="flex flex-col gap-3 mb-4 md:mb-6">
        {Object.keys(client).map((item) => {
          const caption =
            item === "phone_number" ? "Телефонный номер" : "Почта";
          const path =
            item === "phone_number"
              ? "/profile/client/phone"
              : "/profile/client/mail";

          return (
            <div
              key={item}
              className="flex items-center p-4 border border-border-gray rounded-lg justify-between gap-2"
            >
              <div className="flex flex-col md:grid md:grid-cols-2 md:min-w-[380px]">
                <span className="heading-5">{caption}</span>
                <span className="">
                  {client[item] ? client[item] : "Не указана"}
                </span>
              </div>
              <Button
                variant={ButtonThemes.SECONDARY}
                className="btn-small"
                onClick={() => navigate(path)}
              >
                Изменить
              </Button>
            </div>
          );
        })}
      </div>
      <Checkbox
        checked={checked}
        handleCheck={handleCheck}
        label="Получать уведомления на почту"
      />
    </Profile>
  );
};

export default ProfileClient;
