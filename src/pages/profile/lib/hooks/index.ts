import { ChangeEventHandler, useCallback, useEffect, useState } from "react";

import { useProfile, useProfileLoan } from "../../model/api/profileApi";
import { MAX_PHOTO_IN_PROFILE } from "@/shared/lib/constants";

export function useProfileData() {
  const { phone_number, loans } = useProfile(undefined, {
    selectFromResult: ({ currentData }) => ({
      phone_number: currentData?.phone_number,
      loans: currentData?.loans,
    }),
  });

  return { phone_number, loans };
}

export function useLoanData(id: string) {
  const [loan, setLoan] = useState();

  const [getProfileLoan, { isFetching }] = useProfileLoan();

  useEffect(() => {
    async function fn() {
      try {
        const res = await getProfileLoan(id as string).unwrap();

        setLoan(res);
      } catch (e) {
        console.log(e);
      }
    }

    fn();
  }, [getProfileLoan, id]);

  return { loan, isFetching };
}

export const usePreviewImage = () => {
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null
  >();

  const handleSelectImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const targetFiles = e.target.files;
      const file = targetFiles && targetFiles[0];

      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        setPreviewImage(fileReader.result);
        if (targetFiles) console.log(targetFiles);
      });

      if (file) fileReader.readAsDataURL(file);
    },
    [],
  );

  return { previewImage, handleSelectImage };
};

export function usePreviewImages() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [fileImages, setFileImages] = useState<
    Array<string | ArrayBuffer | null>
  >([]);
  console.log(fileImages)

  const handleUploadFiles = (files: File[]) => {
    const uploaded: File[] = [...uploadedFiles];
    const images: Array<string | ArrayBuffer | null> = [...fileImages];

    let limitExceeded = false;

    files.some((file: File) => {
      const isNotAlreadyUploaded =
        uploaded.findIndex((f: File) => f.name === file.name) === -1;

      if (isNotAlreadyUploaded) {
        uploaded.push(file);

        if (uploaded.length === MAX_PHOTO_IN_PROFILE) setFileLimit(true);

        if (uploaded.length > MAX_PHOTO_IN_PROFILE) {
          setFileLimit(false);

          limitExceeded = true;

          return true;
        }
      }
    });

    files.forEach((e) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        images.push(fileReader.result);
        if (!limitExceeded) setFileImages(images);
      });
      if (e) fileReader.readAsDataURL(e);
    });

    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent: ChangeEventHandler<HTMLInputElement> = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);

    handleUploadFiles(chosenFiles);
  };

  return { handleFileEvent, fileLimit, uploadedFiles, fileImages };
}
