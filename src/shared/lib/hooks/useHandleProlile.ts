import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useGetProfile } from "@/pages/account";
import { useActionCreators } from "@/app/providers/rtk-provider";
import { targetPathActions } from "@/entities/user";
import { Paths } from "@/shared/lib/types";

export const useHandleProfile = () => {
  const navigate = useNavigate();
  const [getProfile, { isFetching: isProfileFetching }] = useGetProfile();
  const actionTargetPath = useActionCreators(targetPathActions);

  const handleProfileClick = useCallback(async () => {
    try {
      const profile = await getProfile().unwrap();

      navigate("/account/account_all");
      console.log(profile);
    } catch (e) {
      actionTargetPath.setTargetPath({ targetPath: Paths.PROFILE });

      navigate("/reg/reg_form");
    }
  }, [getProfile, navigate, actionTargetPath]);

  return { handleProfileClick, isProfileFetching };
};
