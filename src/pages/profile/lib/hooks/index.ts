import { useEffect, useState } from "react";

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
