import { useLocationIndex } from "@/pages/application/lib/hooks";
import {
  ProfileMainApplicationSteps,
  ProfileMainApplicationWrapper,
} from "../ProfileMain";

const ProfileMainPayout = () => {
  const { locationIndex } = useLocationIndex("profile");

  return (
    <>
      <ProfileMainApplicationWrapper>
        <ProfileMainApplicationSteps locationIndex={locationIndex} />
      </ProfileMainApplicationWrapper>
    </>
  );
};

export default ProfileMainPayout;
