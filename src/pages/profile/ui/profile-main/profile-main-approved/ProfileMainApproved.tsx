import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  memo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/shared/lib/cn";
import { usePreviewImage, usePreviewImages } from "@/pages/profile/lib/hooks";
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

  const submitApprovedForm: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      navigate("/profile/main/payout");
    },
    [navigate],
  );

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
            onSubmit={submitApprovedForm}
          >
            <div className="flex flex-col">
              {Object.keys(docsView).map((key) => (
                <ProfileDocsView key={key} view={key as Pages} />
              ))}
            </div>
          </form>
        </div>
        <Button form="profile-docs" className="btn-medium w-full max-w-[824px]">
          Продолжить
        </Button>
      </ProfileMainApplicationWrapper>
    </>
  );
};

const ProfileDocsView: FC<{ view: Pages }> = memo(({ view }) => {
  const { previewImage, handleSelectImage, handleRemoveChosenImage, errors } =
    usePreviewImage();
  const {
    fileLimit,
    handleFileEvent,
    fileImages,
    handleRemoveChosenImages,
    errors: errorsFiles,
  } = usePreviewImages();

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
            На фото должны быть разборчиво видны ваши ФИО и фотография
          </p>
        ) : null}
        {errors && view !== "pts" && (
          <p className="text-small text-special-red">{errors}</p>
        )}
        {errorsFiles && view === "pts" && (
          <p className="text-small text-special-red">{errorsFiles}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {view === "pts" ? (
          <ProfileDocksViewMultipleImages
            fileLimit={fileLimit}
            handleFileEvent={handleFileEvent}
            fileImages={fileImages as string[]}
            handleRemoveChosenImages={handleRemoveChosenImages}
          />
        ) : (
          <ProfileDocksViewLoneImage
            previewImage={previewImage as string}
            handleSelectImage={handleSelectImage}
            handleRemoveChosenImage={handleRemoveChosenImage}
          />
        )}
      </div>
    </div>
  );
});

const ProfileDocksViewLoneImage: FC<{
  previewImage: string | undefined;
  handleSelectImage: ChangeEventHandler<HTMLInputElement>;
  handleRemoveChosenImage: MouseEventHandler<HTMLButtonElement>;
}> = memo(({ previewImage, handleSelectImage, handleRemoveChosenImage }) => (
  <>
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
  </>
));

const ProfileDocksViewMultipleImages: FC<{
  fileLimit: boolean;
  handleFileEvent: ChangeEventHandler<HTMLInputElement>;
  fileImages: string[];
  handleRemoveChosenImages: (i: number) => void;
}> = memo(
  ({ fileLimit, handleFileEvent, fileImages, handleRemoveChosenImages }) => (
    <>
      {!fileLimit && (
        <label className="relative inline-block">
          <span className={cn("heading-5", styles["file-input"])}>
            Прикрепить
          </span>
          <input
            type="file"
            name="file"
            onChange={handleFileEvent}
            accept="image/*"
            multiple
            disabled={fileLimit}
            className="absolute -z-1 opacity-0 w-0 h-0"
          />
        </label>
      )}
      <>
        {fileImages.map((image, i) => (
          <div key={i} className="w-[60px] h-[60px] rounded-lg overflow-hidden">
            <button
              className={cn("w-full h-full relative", styles["image-input"])}
              onClick={() => handleRemoveChosenImages(i)}
            >
              <img
                className="h-full w-full object-cover"
                src={image as string}
                alt="uploaded image"
              />
            </button>
          </div>
        ))}
      </>
    </>
  ),
);

export default ProfileMainApproved;
