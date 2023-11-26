import { FC } from "react";

import { SidebarItem } from "./sidebar-item/SidebarItem";

import styles from "./styles.module.scss";

const items = [
  { caption: "Заявки", path: "/requests/req_all" },
  { caption: "Активные займы", path: "/requests/req_loans" },
  { caption: "Персональные данные", path: "/requests/req_personal" },
  { caption: "Документы", path: "/requests/req_docs" },
  { caption: "Профиль", path: "/requests/req_profile" },
];

type SidebarProps = Record<string, never>;

export const Sidebar: FC<SidebarProps> = () => {
  return (
    <ul className={styles.bb__sb}>
      {items.map((item) => {
        const { caption, path } = item;

        return (
          <li key={path}>
            <SidebarItem path={path} caption={caption} />
          </li>
        );
      })}
    </ul>
  );
};
