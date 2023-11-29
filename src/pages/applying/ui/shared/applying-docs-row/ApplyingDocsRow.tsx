import { FC } from "react";

import { cn } from "@/shared/lib/cn";

import styles from "./styles.module.scss";

type ApplyingDocsRowProps = {
  view: "back" | "side" | "front";
  isLoad: boolean;
};

const autoView = {
  back: "Сзади",
  side: "Сбоку",
  front: "Спереди",
};

export const ApplyingDocsRow: FC<ApplyingDocsRowProps> = ({ view, isLoad }) => {
  return (
    <div className={styles.bb__applying_docs_row_wrap}>
      <div className={styles.bb__applying_docs_row}>
        <div className={styles.bb__applying_docs_row_view}>
          <span
            className={cn(styles.bb__applying_docs_row_view_icon, {
              [styles[view]]: true,
            })}
          ></span>
          <span>{autoView[view]}</span>
        </div>
        <div className={styles.bb__applying_docs_row_file}>
          {isLoad ? (
            <label className={styles.bb__applying_docs_row_file_label}>
              <span>Прикрепить</span>
              <input type="file" name="file" />
            </label>
          ) : (
            <div className={styles.bb__applying_docs_row_file_load}></div>
          )}
        </div>
      </div>
      {isLoad ? <p>Вес файла не должен превышать 15 МБ</p> : null}
    </div>
  );
};
