import { FC, useCallback, useState } from "react";

import { Profile } from "../../Profile";
import { Button } from "@/shared/ui/button";
import { MailModal } from "@/features/mail-modal";

const ProfileClientMail: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  return (
    <>
      <Profile title="Почта" isReturn>
        <p className="mb-3">
          Введите адрес электронной почты, чтобы получать уведомления
        </p>
        <div className="md:max-w-[280px] mb-6">
          <input
            placeholder="example@mail.ru"
            className="border border-border-gray outline-none py-2 px-3 focus:border-common-brand rounded-lg w-full"
          />
        </div>
        <Button onClick={toggleModal}>Подтвердить</Button>
      </Profile>
      <MailModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
};

export default ProfileClientMail;
