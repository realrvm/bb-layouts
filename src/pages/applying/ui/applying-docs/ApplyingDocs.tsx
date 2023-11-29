import { FC } from "react";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

import { ApplyingTitle } from "../shared/applying-title/ApplyingTitle";
import { ApplyingBackBtn } from "../shared/applying-back-btn/ApplyingBackBtn";

import styles from "./styles.module.scss";
import { ApplyingDocsRow } from "../shared/applying-docs-row/ApplyingDocsRow";

type ApplyingDocsProps = Record<string, never>;

export const ApplyingDocs: FC<ApplyingDocsProps> = () => {
  return (
    <>
      <div className={styles.bb__applying_wrapper}>
        <ApplyingTitle index={"three"} />
        <div className={styles.bb__applying_inner}>
          <h4>Прикрепите фотографии автомобиля</h4>
          <div className={styles.bb__applying_docs_rows}>
            <ApplyingDocsRow view="front" isLoad={false} />
            <ApplyingDocsRow view="side" isLoad={false} />
            <ApplyingDocsRow view="back" isLoad />
          </div>
        </div>
        <div className={styles.bb__applying_docs_line}></div>
        <div className={styles.bb__applying_docs_btn}>
          <ApplyingBackBtn />
          <AppLink to="/applying/applying_result" theme={AppLinkThemes.PRIMARY}>
            Создать заявку
          </AppLink>
        </div>
      </div>
    </>
  );
};
