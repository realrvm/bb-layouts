import { FC, InputHTMLAttributes, memo } from "react";

import { cn } from "@/shared/lib/cn";

import styles from "./styles.module.scss";

type CheckboxProps = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: FC<CheckboxProps> = memo((props) => {
  const { className = "", ...other } = props;
  return (
    <input
      type="checkbox"
      className={cn(styles.bb__checkbox, {}, [className && styles[className]])}
      {...other}
    />
  );
});
