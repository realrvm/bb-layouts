import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";

import { Application, ApplicationTitle } from "../Application";
import { Button } from "@/shared/ui/button";
import { ButtonThemes, TargetPages } from "@/shared/lib/enums";

import { cn } from "@/shared/lib/cn";

import { usePreviewImage } from "../../lib/hooks";

import styles from "./styles.module.css";

type Side = "back" | "side" | "front";

const autoView: Record<Side, string> = Object.freeze({
  back: "Сзади",
  side: "Сбоку",
  front: "Спереди",
});

const ApplicationDocs: FC = () => {
  const navigate = useNavigate();

  return (
    <Application>
      <ApplicationTitle>Прикрепите фотографии автомобиля</ApplicationTitle>
      <form
        className="flex flex-col md:pt-6 h-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:px-9 pb-9">
          <div className="flex flex-col gap-4">
            {Object.keys(autoView).map((key) => (
              <ApplicationDocsView key={key} view={key as Side} />
            ))}
          </div>
        </div>
        <div className="hidden md:block md:h-px bg-border-gray"></div>
        <div className="py-6 md:p-9 flex justify-between mt-auto md:mt-0 gap-2">
          <Button
            type="button"
            variant={ButtonThemes.SECONDARY}
            onClick={() => navigate(`/${TargetPages.APPLICATION_VEHICLE}`)}
          >
            Назад
          </Button>
          <Button
            onClick={() => navigate("/application/review")}
            className="btn-medium flex-1 md:flex-none"
          >
            Продолжить
          </Button>
        </div>
      </form>
    </Application>
  );
};

const ApplicationDocsView: FC<{ view: Side }> = memo(({ view }) => {
  const { previewImage, handleSelectImage, handleRemoveChosenImage, errors } =
    usePreviewImage();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className={cn(styles["placeholder-img"], styles[view])}></span>
          <span className="heading-5">{autoView[view]}</span>
        </div>
        {errors && <p className="text-small text-special-red">{errors}</p>}
      </div>
      <div>
        {!previewImage ? (
          <label className="relative inline-block">
            <span className={cn("heading-5", styles["file-input"])}>
              Прикрепить
            </span>
            <input
              type="file"
              name="file"
              onChange={handleSelectImage}
              accept="image/*"
              className="absolute -z-1 opacity-0 w-0 h-0"
            />
          </label>
        ) : (
          <div className="w-[60px] h-[60px] rounded-lg overflow-hidden hover:opacity-50">
            <button
              className={cn("w-full h-full relative", styles["image-input"])}
              onClick={handleRemoveChosenImage}
            >
              <img
                className="h-full w-full object-cover"
                src={previewImage as string}
                alt="uploaded image"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default ApplicationDocs;
