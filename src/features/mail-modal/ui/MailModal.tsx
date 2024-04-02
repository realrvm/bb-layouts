import { FC } from "react";

import { ButtonThemes } from "@/shared/lib/enums";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/widgets/modal";
// import { Otp } from "@/widgets/otp";
// import { useOTP } from "@/pages/auth/lib/hooks";

type MailModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: (val: boolean) => void;
};

export const MailModal: FC<MailModalProps> = ({
  isOpenModal,
  setIsOpenModal,
}) => {
  //const { otp, setOtp, setIsResendable, phone } = useOTP();

  return (
    <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
      <div className="relative py-16 px-[1.75rem] md:p-9 h-full w-full md:w-[400px] md:min-h-[min-content]">
        <button
          onClick={() => setIsOpenModal(false)}
          className="absolute top-5 right-5 md:top-3 md:right-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              fill="#969696"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <h4 className="heading-title mb-9 text-center">
            Введите код из письма
          </h4>
          <p className="mb-6 text-text-gray">
            Письмо с кодом отправлено на адрес
          </p>
          <p>email@gmail.com</p>
          {
            // <Otp
            //   value={otp}
            //   onChange={(value) => setOtp(value)}
            //   resendable={setIsResendable}
            //   phone_number={phone}
            // />
          }
          <div className="flex items-center mt-6">
            <Button
              variant={ButtonThemes.SECONDARY}
              onClick={() => setIsOpenModal(false)}
              className="w-full py-4 px-5 heading-5 btm-medium text-unwrap"
            >
              Отправить код ещё раз
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
