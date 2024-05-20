import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ZodError } from "zod";

import { useProfile, useProfileLoans } from "../../model/api/profileApi";
import { MAX_PHOTO_IN_PROFILE } from "@/shared/lib/constants";
import { checkFileSize } from "@/shared/lib/helpers/checkFileSize";
import { ProfileLoansSchema } from "../../model/types";

export function useProfileData() {
  const { phone_number } = useProfile(undefined, {
    selectFromResult: ({ currentData }) => ({
      phone_number: currentData?.phone_number,
    }),
  });

  return { phone_number };
}

export function useLoansData() {
  const [loans, setLoans] = useState<ProfileLoansSchema>();

  const [getProfileLoan, { isFetching }] = useProfileLoans();

  useEffect(() => {
    async function fn() {
      try {
        const res = await getProfileLoan().unwrap();

        setLoans(res);
      } catch (e) {
        console.log(e);
      }
    }

    fn();
  }, [getProfileLoan]);

  return { loans, isFetching };
}

export const usePreviewImage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null
  >();
  const [errors, setErrors] = useState<string | undefined>();

  const schema = checkFileSize();

  const handleSelectImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const targetFiles = e.target.files;
      const file = targetFiles?.length && targetFiles[0];

      try {
        schema.parse({ file });

        setUploadedFile(file as File);
        const fileReader = new FileReader();

        fileReader.addEventListener("load", () => {
          setPreviewImage(fileReader.result);
        });

        if (file) fileReader.readAsDataURL(file);

        setErrors(undefined);
      } catch (error) {
        if (error instanceof ZodError) {
          setPreviewImage(null);

          setErrors(error.errors[0].message);
        }
      }
    },
    [schema],
  );

  const handleRemoveChosenImage: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      setUploadedFile(undefined);
      setErrors(undefined);
      setPreviewImage(null);
    }, []);

  return {
    previewImage,
    handleSelectImage,
    errors,
    handleRemoveChosenImage,
    uploadedFile,
  };
};

export function usePreviewImages() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [fileImages, setFileImages] = useState<
    Array<string | ArrayBuffer | null>
  >([]);
  const [errors, setErrors] = useState<string | undefined>();

  const schema = checkFileSize();

  const handleUploadFiles = useCallback(
    (files: File[]) => {
      const uploaded: File[] = [...uploadedFiles];

      let limitExceeded = false;

      files.some((file: File) => {
        const isNotAlreadyUploaded =
          uploaded.findIndex(
            (currentFile: File) => currentFile.name === file.name,
          ) === -1;

        if (isNotAlreadyUploaded) {
          try {
            setErrors(undefined);

            schema.parse({ file });

            uploaded.push(file);

            if (uploaded.length === MAX_PHOTO_IN_PROFILE) setFileLimit(true);

            if (uploaded.length > MAX_PHOTO_IN_PROFILE) {
              setFileLimit(false);

              limitExceeded = true;

              return true;
            }

            const fileReader = new FileReader();

            fileReader.addEventListener("load", () => {
              if (!limitExceeded)
                setFileImages((prev) => prev.concat(fileReader.result));
            });

            fileReader.readAsDataURL(file);
          } catch (error) {
            if (error instanceof ZodError) {
              setErrors(error.errors[0].message);
            }
          }
        }
      });

      if (!limitExceeded) setUploadedFiles(uploaded);
    },
    [schema, uploadedFiles],
  );

  const handleFileEvent: ChangeEventHandler<HTMLInputElement> = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);

    handleUploadFiles(chosenFiles);
  };

  const handleRemoveChosenImages = (i: number) => {
    setUploadedFiles((prev) => prev.filter((_, index) => index !== i));
    setFileImages((prev) => prev.filter((_, index) => index !== i));
    setFileLimit(false);
    setErrors(undefined);
  };

  return {
    handleFileEvent,
    fileLimit,
    uploadedFiles,
    fileImages,
    handleRemoveChosenImages,
    errors,
  };
}
