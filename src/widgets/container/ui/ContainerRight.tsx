import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

type ContainerProps = {
  children: ReactNode;
};

export const ContainerRight: FC<ContainerProps> = ({ children }) => {
  return <div className={styles.bb__container_right}>{children}</div>;
};
