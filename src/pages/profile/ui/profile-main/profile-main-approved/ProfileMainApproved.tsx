import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/shared/lib/cn";
import { usePreviewImages } from "@/pages/profile/lib/hooks";
import { useLocationIndex } from "@/pages/application/lib/hooks";
import {
  ProfileMainApplicationSteps,
  ProfileMainApplicationWrapper,
} from "../ProfileMain";
import { Button } from "@/shared/ui/button";

import styles from "./styles.module.css";

type Pages = "photo" | "address" | "pts";

const docsView: Record<Pages, string> = Object.freeze({
  photo: "1. Фото паспорта (Разворот с фото)",
  address: "2. Фото паспорта (Разворот с пропиской)",
  pts: "3. ПТС (Все страницы)",
});

const ProfileMainApproved: FC = () => {
  const { locationIndex } = useLocationIndex("profile");
  const navigate = useNavigate();

  return (
    <>
      <ProfileMainApplicationWrapper>
        <ProfileMainApplicationSteps locationIndex={locationIndex} />
        <div className="pt-4 md:pt-6 px-4 md:px-6 pb-1 border border-border-gray rounded-lg max-w-[824px] mb-6 w-full">
          <h4 className="heading-4 md:heading-3 mb-1">
            Прикрепите следующие документы
          </h4>
          <form
            id="profile-docs"
            className="flex flex-col md:pt-6 h-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col">
              {Object.keys(docsView).map((key) => (
                <ProfileDocsView key={key} view={key as Pages} />
              ))}
            </div>
          </form>
        </div>
        <Button
          onClick={() => navigate("/profile/main/payout")}
          form="profile-docs"
          className="btn-medium w-full max-w-[824px]"
        >
          Продолжить
        </Button>
      </ProfileMainApplicationWrapper>
    </>
  );
};

const ProfileDocsView: FC<{ view: Pages }> = memo(({ view }) => {
  const { previewImages, handleSelectImages } = usePreviewImages();

  return (
    <div
      className={cn(
        "flex items-start md:items-center flex-col md:flex-row justify-between py-4 md:py-5 gap-3 md:gap-0",
        {
          "border-t border-t-border-gray": view !== "photo",
        },
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="heading-6 md:heading-5">{docsView[view]}</span>
        {view === "photo" ? (
          <p className="text-medium md:text-small text-text-gray">
            На фото должно быть разборчиво видно
            <br />
            ваше ФИО и фотографию
          </p>
        ) : null}
      </div>
      <div>
        {!previewImages ? (
          <label className="relative inline-block">
            <span className={cn("heading-5", styles["file-input"])}>
              Прикрепить
            </span>
            <input
              type="file"
              name="file"
              onChange={handleSelectImages}
              accept="image/*"
              multiple={view === "pts" ? true : false}
              className="absolute -z-1 opacity-0 w-0 h-0"
            />
          </label>
        ) : (
          <div className="w-[60px] h-[60px] rounded-lg overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={previewImages as string}
              alt="uploaded image"
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default ProfileMainApproved;
