import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "../types";

export const useAppDispatch = useDispatch<AppDispatch>;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActionCreators = (actions: ActionCreatorsMapObject) => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch],
  );
};
