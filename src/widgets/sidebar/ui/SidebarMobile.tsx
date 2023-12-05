import { FC, useRef } from "react";

import styles from "./styles.module.scss";
import { useSwipe } from "@/shared/lib/hooks/useSwipe";
import { SidebarItemMobile } from "./sidebar-item-mobile/SidebarItemMobile";

const items = [
  { caption: "Заявки", path: "/account/account_all" },
  { caption: "Активные займы", path: "/account/account_loans" },
  { caption: "Персональные данные", path: "/account/account_personal" },
  { caption: "Документы", path: "/account/account_docs" },
  { caption: "Профиль", path: "/account/account_profile" },
];

type SidebarMobileProps = Record<string, never>;

export const SidebarMobile: FC<SidebarMobileProps> = () => {
  const refSidebarMobile = useRef<HTMLDivElement | null>(null);
  useSwipe(refSidebarMobile);

  return (
    <div className={styles.bb__sb_mobile_wrapper} ref={refSidebarMobile}>
      <div className={styles.bb__sb_mobile_inner}>
        <ul className={styles.bb__sb_mobile}>
          {items.map((item) => {
            const { caption, path } = item;

            return (
              <li key={path}>
                <SidebarItemMobile path={path} caption={caption} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
