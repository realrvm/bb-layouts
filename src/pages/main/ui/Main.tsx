import { FC } from "react";

import { Navbar } from "@/widgets/navbar";

type MainProps = Record<string, never>;

export const Main: FC<MainProps> = () => {
  return (
    <>
      <Navbar />
      <h2>Main page</h2>
    </>
  );
};
