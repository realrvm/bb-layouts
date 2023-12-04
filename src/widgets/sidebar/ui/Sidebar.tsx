import { FC } from "react";

import { SidebarItem } from "./sidebar-item/SidebarItem";

import styles from "./styles.module.scss";

const items = [
  { caption: "Заявки", path: "/account/account_all" },
  { caption: "Активные займы", path: "/account/account_loans" },
  { caption: "Персональные данные", path: "/account/account_personal" },
  { caption: "Документы", path: "/account/account_docs" },
  { caption: "Профиль", path: "/account/account_profile" },
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
