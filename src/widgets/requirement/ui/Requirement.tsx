import { FC } from "react";

import styles from "./styles.module.scss";

import car from "@/shared/assets/images/car.png";
import car2 from "@/shared/assets/images/car2.png";
import truck from "@/shared/assets/images/truck.png";
import dozer from "@/shared/assets/images/dozer.png";
import { RequirementVehicles } from "./requirement-vehicles/RequirementVehicles";
import { Container } from "@/widgets/container";

const vehicles = [
  { descr: "Легковое авто", vehicle: car, id: 1 },
  { descr: "Грузовое авто", vehicle: truck, id: 2 },
  { descr: "Коммерческое авто", vehicle: car2, id: 3 },
  { descr: "Спецтехника", vehicle: dozer, id: 4 },
];

type RequirementProps = Record<string, never>;

export const Requirement: FC<RequirementProps> = () => {
  return (
    <Container>
      <section className={styles.bb__requirement}>
        <h2>Под что можно получить займ?</h2>
        <div className={styles.bb__requirement_wrapper}>
          {vehicles.map((vehicle) => {
            const { id, ...other } = vehicle;

            return <RequirementVehicles key={id} {...other} />;
          })}
        </div>
      </section>
    </Container>
  );
};
