import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

type ContainerProps = {
  children: ReactNode;
  hasRightIndent?: boolean;
};

export const Container: FC<ContainerProps> = ({ children, hasRightIndent }) => {
  return (
    <div
      className={
        hasRightIndent ? styles["bb__container--indent"] : styles.bb__container
      }
    >
      {children}
    </div>
  );
};
