import { FC } from "react";

import { Button, ButtonThemes } from "@/shared/ui/button";
import { AppLink } from "@/shared/ui/app-link";

import styles from "./styles.module.scss";

type AccountDocProps = {
  caption: string;
};

export const AccountDoc: FC<AccountDocProps> = ({ caption }) => {
  return (
    <div className={styles.bb__req_doc}>
      <AppLink to="*">
        <div className={styles.bb__req_doc_wrap}>
          <span className={styles.bb__req_doc_icon}></span>
          <span className={styles.bb__req_doc_caption}>{caption}</span>
        </div>
        <Button className={styles.bb__req_doc_dl} theme={ButtonThemes.PRIMARY}>
          <span></span>
          Скачать
        </Button>
      </AppLink>
    </div>
  );
};
