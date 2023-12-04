import { FC } from "react";

import styles from "./styles.module.scss";
import { Button, ButtonThemes } from "@/shared/ui/button";

type AccountDocProps = {
  caption: string;
};

export const AccountDoc: FC<AccountDocProps> = ({ caption }) => {
  return (
    <div className={styles.bb__req_doc}>
      <div className={styles.bb__req_doc_wrap}>
        <span className={styles.bb__req_doc_icon}></span>
        <span className={styles.bb__req_doc_caption}>{caption}</span>
      </div>
      <Button
        className={styles.bb__req_doc_dl}
        onClick={() => console.log("download docs")}
        theme={ButtonThemes.CLEAN}
      >
        <span></span>
        Скачать
      </Button>
    </div>
  );
};
