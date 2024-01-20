import { ComponentPropsWithoutRef, FC, ReactNode, memo } from "react";

import { ButtonThemes } from "../types";
import { cn } from "@/shared/lib/cn";

import styles from "./styles.module.scss";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  theme?: ButtonThemes;
} & ComponentPropsWithoutRef<"button">;

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className = "",
    theme = ButtonThemes.PRIMARY,
    children,
    ...other
  } = props;
  return (
    <button
      className={cn(styles.bb__btn, { [styles[theme]]: true }, [className])}
      {...other}
    >
      {children}
    </button>
  );
});
