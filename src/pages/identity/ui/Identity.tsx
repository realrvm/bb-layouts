import { FC } from "react";

type IdentityProps = Record<string, never>;

export const Identity: FC<IdentityProps> = () => {
  return <h1>Identity Page</h1>;
};
