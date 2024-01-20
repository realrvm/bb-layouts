import { ComponentPropsWithoutRef, FC, memo } from "react";

import { cn } from "@/shared/lib/cn";

import styles from "./styles.module.scss";

type CheckboxProps = {
  className?: string;
  isChecked?: boolean;
  handleCheck: (value: boolean) => void;
} & ComponentPropsWithoutRef<"input">;

export const Checkbox: FC<CheckboxProps> = memo((props) => {
  const { className = "", isChecked = false, handleCheck, ...other } = props;

  return (
    <input
      type="checkbox"
      className={cn(styles.bb__checkbox, { [styles["checked"]]: isChecked }, [
        className && styles[className],
      ])}
      checked={isChecked}
      onChange={(e) => handleCheck(e.target.checked)}
      {...other}
    />
  );
});
