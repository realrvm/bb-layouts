import { useState } from "react";

export const useLocaleStorage = (key: string) => {
  const [state, setState] = useState(window.localStorage.getItem(key));

  function setStorage(item: string) {
    window.localStorage.setItem(key, item);
    setState(item);
  }

  return [state, setStorage] as const;
};
