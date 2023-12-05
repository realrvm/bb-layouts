import { FC, useCallback, useState } from "react";

import { Checkbox } from "@/shared/ui/checkbox";
import { AccountProfileItem } from "./account-profile-item/AccountProfileItem";

import styles from "./styles.module.scss";
import { SidebarMobile } from "@/widgets/sidebar";

const profile_items = [
  {
    id: 1,
    val: "Телефонный номер",
    caption: "+7 924 225 92 27",
    path: "phone",
  },
  { id: 2, val: "Почта", caption: "Не указана", path: "mail" },
];

type AccountProfileProps = Record<string, never>;

export const AccountProfile: FC<AccountProfileProps> = () => {
  const [checked, isChecked] = useState(false);

  const handleCheck = useCallback((state: boolean) => {
    isChecked(state);
  }, []);
  return (
    <>
      <SidebarMobile />
      <div className={styles.bb__req_profile_wrapper}>
        <h2>Профиль</h2>
        <ul className={styles.bb__req_profile_list}>
          {profile_items.map((doc) => {
            const { id, ...other } = doc;

            return (
              <li key={id}>
                <AccountProfileItem {...other} />
              </li>
            );
          })}
        </ul>
        <div className={styles.bb__req_profile_footer}>
          <Checkbox id="cb" handleCheck={handleCheck} checked={checked} />
          <label htmlFor="cb">Получать уведомления на почту</label>
        </div>
      </div>
    </>
  );
};
