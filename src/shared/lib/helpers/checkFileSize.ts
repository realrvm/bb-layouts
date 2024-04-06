import { z } from "zod";
import { MAX_PHOTO_SIZE } from "@/shared/lib/constants";

const ACCEPTED_IMAGE_TYPES: string[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export function checkFileSize() {
  return z.object({
    file: z
      .custom<File>()
      .refine(
        (file) => {
          return file.size <= MAX_PHOTO_SIZE;
        },
        `Вес файла не может превышать ${Math.floor(MAX_PHOTO_SIZE / 1048576)} МБ`,
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Разрешены только .jpg, .jpeg, .png and .webp",
      ),
  });
}
