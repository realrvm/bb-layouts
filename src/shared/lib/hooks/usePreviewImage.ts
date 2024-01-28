import { ChangeEventHandler, useCallback, useState } from "react";

import { useCreateModel, useGetPresign } from "@/pages/applying";

const usePresign = () => {
  const [, { data: vehicleUid }] = useCreateModel({
    fixedCacheKey: "shared-create-model-post",
  });
  const [getPresign] = useGetPresign();

  function upload(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      retrieveNewURL(file, (file: File, url: string) => {
        uploadFile(file, url);
      });
    }
  }

  async function retrieveNewURL(
    file: File,
    cb: (file: File, url: string) => void,
  ) {
    try {
      if (vehicleUid) {
        const res = await getPresign({
          uid: vehicleUid.id.toString(),
          file_name: file.name,
        }).unwrap();

        if (res) cb(file, res.url);
      }
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  async function uploadFile(file: File, url: string) {
    try {
      const res = await fetch(url, { method: "PUT", body: file });
      console.log(res);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  return { upload };
};

export const usePreviewImage = () => {
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | null
  >();

  const { upload } = usePresign();

  const handleSelectImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const targetFiles = e.target.files;
      const file = targetFiles && targetFiles[0];

      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        setPreviewImage(fileReader.result);
        if (targetFiles) upload(targetFiles);
      });

      if (file) fileReader.readAsDataURL(file);
    },
    [],
  );

  return { previewImage, handleSelectImage };
};
