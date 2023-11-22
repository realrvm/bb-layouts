import { FC } from "react";

import { Navbar } from "@/widgets/navbar";
import { Calculator } from "@/widgets/calculator/";
import { Conditions } from "@/widgets/conditions";
import { HowItWorks } from "@/widgets/how-it-works";
import { Footer } from "@/widgets/footer";

type MainProps = Record<string, never>;

export const Main: FC<MainProps> = () => {
  return (
    <>
      <Navbar />
      <Calculator />
      <Conditions />
      <HowItWorks />
      <Footer />
    </>
  );
};
