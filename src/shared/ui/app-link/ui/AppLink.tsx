import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

import { cn } from "@/shared/lib/cn";

import { AppLinkThemes } from "../types";

import styles from "./styles.module.scss";

type AppLinkProps = {
  to: string;
  className?: string;
  theme?: AppLinkThemes;
} & LinkProps;

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    to,
    className,
    theme = AppLinkThemes.BASIC,
    children,
    ...other
  } = props;

  return (
    <Link
      to={to}
      className={cn(styles.bb__app_link, { [styles[theme]]: true }, [
        className,
      ])}
      {...other}
    >
      {children}
    </Link>
  );
};
