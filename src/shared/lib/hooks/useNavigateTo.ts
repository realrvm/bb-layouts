import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useActionCreators, useStateSelector } from "@/app/providers/rtk";
import { targetPageActions } from "@/entities/target-page";
import { TargetPages } from "@/shared/lib/enums";
import { useGetProfile } from "@/pages/profile/model/api/profileApi";
import { getLoan, usePostLoan } from "@/entities/loan";
import { STORAGE, STORAGE_TOKEN } from "../constants";

export function useNavigateTo(page: TargetPages) {
  const navigate = useNavigate();
  const targetPageAction = useActionCreators(targetPageActions);

  const loan = useStateSelector(getLoan);
  const [getProfile, { isFetching }] = useGetProfile();
  const [postLoan, { isLoading }] = usePostLoan();

  const isNavigateFetching = isFetching || isLoading;

  const handleNavigateTo = useCallback(async () => {
    try {
      targetPageAction.setTargetPage(page);

      const token = JSON.parse(
        STORAGE.getItem(STORAGE_TOKEN) || JSON.stringify(""),
      ) as string;

      if(!token) {
        throw new Error('no token')
      }

      if (page === TargetPages.APPLICATION_VEHICLE) {
        await postLoan(loan).unwrap();
      }

      if (
        page === TargetPages.PROFILE ||
        page === TargetPages.APPLICATION_CALCULATOR
      ) {
        await getProfile().unwrap();
      }

      navigate(page);
    } catch (e) {
      if (
        page === TargetPages.APPLICATION_VEHICLE ||
        page === TargetPages.APPLICATION_CALCULATOR
      ) {
        navigate(`${TargetPages.AUTH}/application`);
      }
      if (page === TargetPages.PROFILE) {
        navigate(`${TargetPages.AUTH}/profile`);
      }
    }
  }, [navigate, page, targetPageAction, getProfile, loan, postLoan]);

  return { handleNavigateTo, isNavigateFetching };
}
