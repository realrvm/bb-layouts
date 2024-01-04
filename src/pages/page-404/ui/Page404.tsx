import { FC } from "react";

import { Footer } from "@/widgets/footer";
import { Navbar } from "@/widgets/navbar";
import { Container } from "@/widgets/container";

import { AppLink, AppLinkThemes } from "@/shared/ui/app-link";

import styles from "./styles.module.scss";

type Page404Props = Record<string, never>;

/**
 * Component for 404 page
 * @returns {ReactNode}
 */
const Page404: FC<Page404Props> = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className={styles.bb__page404}>
          <h1>404</h1>
          <h2>Страница не найдена</h2>
          <p>К сожалению, такой страницы нет.</p>
          <p>Попробуйте вернуться назад или изменить адрес страницы.</p>
          <AppLink to="/" theme={AppLinkThemes.PRIMARY}>
            Перейти на главную
          </AppLink>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Page404;
