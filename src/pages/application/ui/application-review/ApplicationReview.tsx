import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@/widgets/container";
import { SimpleHeader } from "@/widgets/header";
import { Button } from "@/shared/ui/button";
import { Clock } from "@/shared/ui/icons";

const ApplicationReview: FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="h-full">
      <SimpleHeader />
      <div className="py-10 md:py-12 max-w-full md:max-w-[452px] mx-auto flex flex-col items-center h-[calc(100%-65px)]">
        <div className="flex flex-col items-center">
          <div className="mb-6 md:mb-9 w-12 h-12 rounded-full bg-brand-light grid place-items-center shrink-0">
            <Clock />
          </div>
          <h2 className="heading-title md:heading-2 mb-3">
            Заявка на рассмотрении
          </h2>
          <p className="text-center mb-9">
            В течении 20 мин. с вами свяжется наш агент
          </p>
        </div>
        <div className="mt-auto md:mt-0 flex w-full justify-center">
          <Button
            onClick={() => navigate("/profile/main")}
            className="text-center btn-medium flex-1 md:flex-none"
          >
            Перейти в личный кабинет
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ApplicationReview;
