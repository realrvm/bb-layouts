import { FC, useRef } from "react";

import styles from "./styles.module.scss";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";
import { SidebarItemMobile } from "./sidebar-item-mobile/SidebarItemMobile";

const items = [
  { caption: "Заявки", path: "/requests/req_all" },
  { caption: "Активные займы", path: "/requests/req_loans" },
  { caption: "Персональные данные", path: "/requests/req_personal" },
  { caption: "Документы", path: "/requests/req_docs" },
  { caption: "Профиль", path: "/requests/req_profile" },
];

type SidebarMobileProps = Record<string, never>;

export const SidebarMobile: FC<SidebarMobileProps> = () => {
  const refSidebarMobile = useRef<HTMLUListElement | null>(null);
  useSwipe(refSidebarMobile);

  return (
    <ul className={styles.bb__sb_mobile} ref={refSidebarMobile}>
      {items.map((item) => {
        const { caption, path } = item;

        return (
          <li key={path}>
            <SidebarItemMobile path={path} caption={caption} />
          </li>
        );
      })}
    </ul>
  );
};
