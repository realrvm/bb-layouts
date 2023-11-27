import { FC } from "react";

import { Checkbox } from "@/shared/ui/checkbox";
import { ReqProfileItem } from "./req-profile-item/ReqProfileItem";

import styles from "./styles.module.scss";

const profile_items = [
  {
    id: 1,
    val: "Телефонный номер",
    caption: "+7 924 225 92 27",
    path: "phone",
  },
  { id: 2, val: "Почта", caption: "Не указана", path: "mail" },
];

type ReqProfileProps = Record<string, never>;

export const ReqProfile: FC<ReqProfileProps> = () => {
  return (
    <div className={styles.bb__req_profile_wrapper}>
      <h2>Профиль</h2>
      <ul className={styles.bb__req_profile_list}>
        {profile_items.map((doc) => {
          const { id, ...other } = doc;

          return (
            <li key={id}>
              <ReqProfileItem {...other} />
            </li>
          );
        })}
      </ul>
      <div className={styles.bb__req_profile_footer}>
        <Checkbox id="cb" />
        <label htmlFor="cb">Получать уведомления на почту</label>
      </div>
    </div>
  );
};
