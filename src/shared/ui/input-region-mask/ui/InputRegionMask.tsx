import { FC, InputHTMLAttributes, memo, useEffect, useRef } from "react";

type InputRegionMaskProps = {
  onSetRegion: (region: string) => void;
  focus?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputRegionMask: FC<InputRegionMaskProps> = memo((props) => {
  const { onSetRegion, focus, ...other } = props;

  const inputRegion = useRef<HTMLInputElement>(null);

  const handleChangeRegion = () => {
    const regionValue = inputRegion.current?.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})/);

    if (regionValue) {
      (inputRegion.current as HTMLInputElement).value = regionValue[1];
    }

    onSetRegion(inputRegion.current?.value || "00");
  };

  useEffect(() => {
   focus && inputRegion.current?.focus();
  }, [focus]);

  return (
    <input
      type="text"
      onChange={handleChangeRegion}
      placeholder="00"
      ref={inputRegion}
      maxLength={3}
      {...other}
    />
  );
});
