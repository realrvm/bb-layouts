import { FC } from "react";

import styles from "./styles.module.scss";
import { cn } from "@/shared/lib/cn";

type ApplyingTitleProps = {
  index: "one" | "two" | "three";
};

export const ApplyingTitle: FC<ApplyingTitleProps> = ({ index }) => {
  return (
    <>
      <div className={styles.bb__applying_title}>
        <h2>Заявка</h2>
        <div className={styles.bb__applying_steps}>
          <span
            className={cn(styles.bb__applying_step, {
              [styles[index]]: index === "one",
            })}
          >
            1
          </span>
          <span className={styles.bb__applying_step_line}></span>
          <span
            className={cn(styles.bb__applying_step, {
              [styles[index]]: index === "two",
            })}
          >
            2
          </span>
          <span className={styles.bb__applying_step_line}></span>
          <span
            className={cn(styles.bb__applying_step, {
              [styles[index]]: index === "three",
            })}
          >
            3
          </span>
        </div>
      </div>
      <div className={styles.bb__applying_title_line}></div>
    </>
  );
};
