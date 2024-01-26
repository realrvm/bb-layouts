import { ChangeEventHandler, useCallback, useState } from "react";

export const usePreviewImage = () => {
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null
  >();

  const handleSelectImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const file = e.target.files && e.target.files[0];

      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        setPreviewImage(fileReader.result);
      });

      if (file) fileReader.readAsDataURL(file);
    },
    [],
  );

  return { previewImage, handleSelectImage };
};
