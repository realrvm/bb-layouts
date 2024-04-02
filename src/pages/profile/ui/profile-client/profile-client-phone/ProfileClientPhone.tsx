import { FC, useCallback, useState } from "react";

import { Profile } from "../../Profile";
import { InputMask } from "@/shared/ui/input-mask";
import { Button } from "@/shared/ui/button";
import { PhoneModal } from "@/features/phone-modal";

const ProfileClientPhone: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  return (
    <>
      <Profile title="Телефонный номер" isReturn>
        <p className="mb-3">
          Введите новый номер телефона, который будет привязан к вашему аккаунту
        </p>
        <div className="max-w-[280px] mb-6">
          <InputMask setCard={() => {}} />
        </div>
        <Button onClick={toggleModal}>Подтвердить</Button>
      </Profile>
      <PhoneModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
};

export default ProfileClientPhone;
