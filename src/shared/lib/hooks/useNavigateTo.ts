import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActionCreators } from "@/app/providers/rtk";
import { targetPageActions } from "@/entities/target-page";
import { ApplicationStatus, TargetPages } from "@/shared/lib/enums";
import { useGetProfile } from "@/pages/profile/model/api/profileApi";
import { useExpectedPostLoan, useGetLastLoan } from "@/entities/loan";
import {
  STORAGE,
  STORAGE_EXPECTED,
  STORAGE_TOKEN,
} from "@/shared/lib/constants";
import { LastLoanSchema } from "@/entities/loan/model/types";

export function navigateByLoanStatus(
  status: ApplicationStatus | undefined,
  page: TargetPages,
): string {
  switch (status) {
    case ApplicationStatus.LOAN_SUM_SELECTED:
      return "/application/vehicle";
    case ApplicationStatus.CAR_DATA_SELECTED:
      return `/application/docs`;
    case ApplicationStatus.CAR_EVALUATED:
      return `/application/review`;
    default:
      return `/${page}`;
  }
}

function getDataFromStorage(token: string) {
  return JSON.parse(STORAGE.getItem(token) || JSON.stringify(""));
}

export function useNavigateTo(page: TargetPages) {
  const navigate = useNavigate();
  const targetPageAction = useActionCreators(targetPageActions);
  const [lastLoan, setLastLoan] = useState<LastLoanSchema>();

  const [getProfile, { isFetching }] = useGetProfile();
  const [postLoan, { isLoading }] = useExpectedPostLoan();
  const [getLastLoan, { isSuccess: isLastLoanSuccess }] = useGetLastLoan();

  useEffect(() => {
    const token = getDataFromStorage(STORAGE_TOKEN);
    async function fn() {
      try {
        const lastLoan = await getLastLoan().unwrap();
        setLastLoan(lastLoan);
      } catch (e) {
        console.log(e);
      }
    }

    if (token) {
      fn();
    }
  }, [getLastLoan]);

  const isNavigateFetching = isFetching || isLoading;

  const handleNavigateTo = useCallback(async () => {
    const token = getDataFromStorage(STORAGE_TOKEN);
    const loan = getDataFromStorage(STORAGE_EXPECTED);

    try {
      targetPageAction.setTargetPage(page);

      if (!token) {
        throw new Error("no token");
      }

      if (
        page === TargetPages.APPLICATION_VEHICLE &&
        isLastLoanSuccess &&
        !lastLoan?.status
      ) {
        await postLoan(loan).unwrap();
      }

      if (
        page === TargetPages.PROFILE ||
        page === TargetPages.APPLICATION_CALCULATOR
      ) {
        await getProfile().unwrap();
      }

      if (page === TargetPages.PROFILE) {
        navigate(page);
      } else {
        navigate(navigateByLoanStatus(lastLoan?.status, page));
      }
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
  }, [
    navigate,
    page,
    targetPageAction,
    getProfile,
    postLoan,
    isLastLoanSuccess,
    lastLoan?.status,
  ]);

  return { handleNavigateTo, isNavigateFetching, isLastLoanSuccess, lastLoan };
}
