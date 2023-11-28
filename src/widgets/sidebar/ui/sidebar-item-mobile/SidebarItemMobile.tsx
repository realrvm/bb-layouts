import { FC } from "react";

import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

type SidebarItemMobileProps = {
  caption: string;
  path: string;
};

export const SidebarItemMobile: FC<SidebarItemMobileProps> = ({
  caption,
  path,
}) => {
  return (
    <div className={styles.bb__navlink_mobile_wrap}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        {caption}
      </NavLink>
    </div>
  );
};
