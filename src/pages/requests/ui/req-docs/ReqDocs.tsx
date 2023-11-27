import { FC } from "react";

import styles from "./styles.module.scss";
import { ReqDoc } from "./req-doc/ReqDoc";

const docs = [
  { id: 1, caption: "Договор №1235" },
  { id: 2, caption: "Договор No1234" },
];

type ReqDocsProps = Record<string, never>;

export const ReqDocs: FC<ReqDocsProps> = () => {
  return (
    <div className={styles.bb__docs_wrapper}>
      <h2>Документы</h2>
      <ul className={styles.bb__docs_list}>
        {docs.map((doc) => {
          const { id, ...other } = doc;

          return (
            <li key={id}>
              <ReqDoc {...other} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
