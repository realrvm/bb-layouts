import { FC, InputHTMLAttributes, memo, useRef } from "react";

type InputPlateMaskProps = {
  onSetPlate: (plate: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputPlateMask: FC<InputPlateMaskProps> = memo((props) => {
  const { onSetPlate, ...other } = props;

  const inputPlate = useRef<HTMLInputElement>(null);

  const handleChangePlate = () => {
    const plateValue = inputPlate.current?.value
      .replace(/[^0-9\u0430-\u044f]/g, "")
      .match(/([\u0430-\u044f]{0,1})(\d{0,3})([\u0430-\u044f]{0,2})/);

    if (plateValue) {
      (inputPlate.current as HTMLInputElement).value = !plateValue[2]
        ? plateValue[1]
        : `${plateValue[1]} ${plateValue[2]}${`${
            plateValue[3] ? ` ${plateValue[3]}` : ""
          }`}`;
    }

    const plate = inputPlate.current?.value.replace(
      /[^0-9\u0430-\u044f]/g,
      "",
    ) as string;

    onSetPlate(plate.toUpperCase());
  };

  return (
    <input
      type="text"
      ref={inputPlate}
      placeholder="A 000 AA"
      onChange={handleChangePlate}
      maxLength={8}
      {...other}
    />
  );
});
