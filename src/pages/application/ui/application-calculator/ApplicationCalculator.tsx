import { FC, useEffect, useState } from "react";

import { Button } from "@/shared/ui/button";

import {
  CalculatorMonthsList,
  CalculatorRangeSlider,
} from "@/widgets/calculator";
import { Months } from "@/shared/lib/types";
import { terms } from "@/shared/lib/variables/common";
import {
  calcLoanCredit,
  calcMonthlyPayment,
} from "@/widgets/calculator/lib/utils";
import { useLoanCalculator } from "@/widgets/calculator/lib/hooks";
import { Application, ApplicationTitle } from "../Application";
import { useApplicationCalculator } from "../../lib/hooks";
import { LastLoanSchema } from "@/entities/loan/model/types";
import { useGetLastLoan } from "@/entities/loan";

import styles from "./styles.module.css";

const ApplicationCalculator: FC = () => {
  const [lastLoan, setLastLoan] = useState<LastLoanSchema>();
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [activeTerm, setActiveTerm] = useState<Months | string>(terms[0]);
  const [getLastLoan] = useGetLastLoan();
  const [expectedSum, setExpectedSum] = useState<number>(0);

  const { handleSubmit } = useApplicationCalculator(
    rangeValue,
    activeTerm as Months,
  );

  useEffect(() => {
    async function fn() {
      const lastLoanVal = await getLastLoan().unwrap();
      setLastLoan(lastLoanVal);
      setActiveTerm(
        (lastLoan?.expected_term &&
          (lastLoan?.expected_term.toString() as string)) ||
          terms[0],
      );
      setExpectedSum(
        lastLoan?.expected_sum ? Number(lastLoan?.expected_sum) / 10000 : 0,
      );
    }

    fn();
  }, [getLastLoan, lastLoan?.expected_term, lastLoan?.expected_sum]);

  return (
    <Application>
      <ApplicationTitle>Введите сумму займа</ApplicationTitle>
      <form className="flex flex-col md:pt-6 h-full" onSubmit={handleSubmit}>
        <div className="md:px-9">
          <div className="mb-6">
            <p className="mb-2">Сумма займа</p>
            <div className="flex items-center justify-between py-4 px-5 rounded-lg border border-border-gray heading-5">
              <span key={expectedSum}>{calcLoanCredit(rangeValue || expectedSum)}</span>
              <span>₽</span>
            </div>
            <div className="w-[90%] mx-auto -translate-y-[2px]">
              <CalculatorRangeSlider
                setRangeValue={setRangeValue}
                defaultValue={expectedSum}
              />
            </div>
          </div>
          <div className="mb-[38px]">
            <p className="mb-2">Срок займа, месяцев</p>
            <div className="p-0.5 border border-border-gray rounded-lg">
              <CalculatorMonthsList
                activeTerm={activeTerm as Months}
                setActiveTerm={setActiveTerm}
              />
            </div>
          </div>
          <div className="flex gap-1 flex-col mb-9">
            <ApplicationObligatoryPayment
              rangeValue={rangeValue}
              activeTerm={activeTerm as Months}
            />
          </div>
        </div>
        <div className="hidden md:block md:h-px bg-border-gray"></div>
        <div className="py-6 md:p-9 flex justify-end mt-auto md:mt-0">
          <Button className="btn-medium flex-1 md:flex-none">Продолжить</Button>
        </div>
      </form>
    </Application>
  );
};

const ApplicationObligatoryPayment: FC<{
  rangeValue: number;
  activeTerm: Months;
}> = ({ rangeValue, activeTerm }) => {
  const { rate } = useLoanCalculator();

  return (
    <>
      <div className="flex gap-2">
        Обязательный платёж
        <div className={styles["obligatory-payment"]}>
          <span className={styles["obligatory-payment--icon"]}></span>
        </div>
      </div>
      <span className="heading-3">
        от {calcMonthlyPayment(calcLoanCredit(rangeValue), activeTerm, rate)} ₽
      </span>
    </>
  );
};

export default ApplicationCalculator;
