import { FC } from "react";

import styles from "./styles.module.scss";
import { AppImage } from "@/shared/ui/app-image";

type RequirementVehiclesProps = {
  descr: string;
  vehicle: string;
};

export const RequirementVehicles: FC<RequirementVehiclesProps> = ({
  descr,
  vehicle,
}) => {
  return (
    <div className={styles.bb__requirement_card}>
      <span>{descr}</span>
      <AppImage src={vehicle} />
    </div>
  );
};
