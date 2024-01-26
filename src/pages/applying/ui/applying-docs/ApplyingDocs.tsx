import { FC, memo } from "react";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

import { ApplyingTitle } from "../shared/applying-title/ApplyingTitle";
import { ApplyingBackBtn } from "../shared/applying-back-btn/ApplyingBackBtn";
import { cn } from "@/shared/lib/cn";
import { usePreviewImage } from "@/shared/lib/hooks/usePreviewImage";

import styles from "./styles.module.scss";

type ApplyingDocsProps = Record<string, never>;

type Side = "back" | "side" | "front";

type ApplyingDocsRowProps = {
  view: Side;
};

const autoView: Record<Side, string> = Object.freeze({
  back: "Сзади",
  side: "Сбоку",
  front: "Спереди",
});

export const ApplyingDocs: FC<ApplyingDocsProps> = () => {
  return (
    <>
      <div className={styles.bb__applying_wrapper}>
        <ApplyingTitle index={"three"} />
        <div className={styles.bb__applying_inner}>
          <h4>Прикрепите фотографии автомобиля</h4>
          <div className={styles.bb__applying_docs_rows}>
            {Object.keys(autoView).map((key) => (
              <ApplyingDocsRow key={key} view={key as Side} />
            ))}
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

export const ApplyingDocsRow: FC<ApplyingDocsRowProps> = memo(({ view }) => {
  const { previewImage, handleSelectImage } = usePreviewImage();

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
          {!previewImage ? (
            <label className={styles.bb__applying_docs_row_file_label}>
              <span>Прикрепить</span>
              <input
                type="file"
                name="file"
                onChange={handleSelectImage}
                accept="image/*"
              />
            </label>
          ) : (
            <div className={styles.bb__applying_docs_row_file_load}>
              <img src={previewImage as string} alt="uploaded-image" />
            </div>
          )}
        </div>
      </div>
      {!previewImage ? <p>Вес файла не должен превышать 15 МБ</p> : null}
    </div>
  );
});
