import { ChangeEventHandler, useCallback, useEffect, useState } from "react";

import { useProfile, useProfileLoan } from "../../model/api/profileApi";

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

export const usePreviewImages = () => {
  const [previewImages, setPreviewImages] = useState<
    string | ArrayBuffer | null
  >();

  const handleSelectImages: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const targetFiles = e.target.files;
      const file = targetFiles && targetFiles[0];

      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        setPreviewImages(fileReader.result);
        if (targetFiles) console.log(targetFiles);
      });

      if (file) fileReader.readAsDataURL(file);
    },
    [],
  );

  return { previewImages, handleSelectImages };
};
