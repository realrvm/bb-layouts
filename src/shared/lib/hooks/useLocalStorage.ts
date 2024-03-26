import { useState } from "react";
import { z } from "zod";

const localeStorageSchema = z.string().min(1);

export const useLocaleStorage = (key: string) => {
  const [state, setState] = useState(window.localStorage.getItem(key));

  function setStorage(item: string) {
    window.localStorage.setItem(key, item);
    setState(item);
  }

  const { success } = localeStorageSchema.safeParse(state);

  return { state, success, setStorage };
};
