import { useRef, memo, FC } from "react";

import styles from "./styles.module.scss";

type InputMaskProps = {
  setCard: (card: string) => void;
};

export const InputMask: FC<InputMaskProps> = memo(({ setCard }) => {
  const inputCard = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    const cardValue = inputCard.current?.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (cardValue) {
      (inputCard.current as HTMLInputElement).value = !cardValue[2]
        ? cardValue[1]
        : `(${cardValue[1]}) ${cardValue[2]}${`${
            cardValue[3] ? `-${cardValue[3]}` : ""
          }`}${`${cardValue[4] ? `-${cardValue[4]}` : ""}`}`;
    }
    const numbers = inputCard.current?.value.replace(/(\D)/g, "") as string;
    setCard(numbers);
  };

  return (
    <div className={styles.bb__input_mask_tel}>
      <span>+7</span>
      <input
        type="tel"
        ref={inputCard}
        onChange={handleChange}
        placeholder="(000) 000-00-00"
      />
    </div>
  );
});
