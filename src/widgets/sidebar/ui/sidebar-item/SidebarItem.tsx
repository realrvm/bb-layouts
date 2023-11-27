import { FC } from "react";

import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

type SidebarItemProps = {
  caption: string;
  path: string;
};

export const SidebarItem: FC<SidebarItemProps> = ({ caption, path }) => {
  return (
    <div className={styles.bb__navlink_wrap}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        {caption}
      </NavLink>
    </div>
  );
};
