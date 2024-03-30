import { useLocationIndex } from "@/pages/application/lib/hooks";
import {
  ProfileMainApplicationSteps,
  ProfileMainApplicationWrapper,
} from "../ProfileMain";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

const ProfileMainApproved = () => {
  const { locationIndex } = useLocationIndex("profile");
  const navigate = useNavigate();

  return (
    <>
      <ProfileMainApplicationWrapper>
        <ProfileMainApplicationSteps locationIndex={locationIndex} />
        <Button onClick={() => navigate("/profile/main/payout")}>
          К выплатам/ временная кнопка
        </Button>
      </ProfileMainApplicationWrapper>
    </>
  );
};

export default ProfileMainApproved;
