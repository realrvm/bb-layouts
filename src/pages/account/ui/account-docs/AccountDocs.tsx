import { FC } from "react";

import { AccountDoc } from "./account-doc/AccountDoc";

import styles from "./styles.module.scss";

const docs = [
  { id: 1, caption: "Договор №1235" },
  { id: 2, caption: "Договор No1234" },
];

type AccountDocsProps = Record<string, never>;

export const AccountDocs: FC<AccountDocsProps> = () => {
  return (
    <div className={styles.bb__docs_wrapper}>
      <h2>Документы</h2>
      <ul className={styles.bb__docs_list}>
        {docs.map((doc) => {
          const { id, ...other } = doc;

          return (
            <li key={id}>
              <AccountDoc {...other} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
