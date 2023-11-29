import { FC } from "react";

import styles from "./styles.module.scss";
import { Footer } from "@/widgets/footer";
import { Navbar } from "@/widgets/navbar";
import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

type Page404Props = Record<string, never>;

export const Page404: FC<Page404Props> = () => {
  return (
    <>
      <Navbar />
      <div className={styles.bb__page404}>
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>К сожалению, такой страницы нет.</p>
        <p>Попробуйте вернуться назад или изменить адрес страницы.</p>
        <AppLink to="/" theme={AppLinkThemes.PRIMARY}>
          Перейти на главную
        </AppLink>
      </div>
      <Footer />
    </>
  );
};
