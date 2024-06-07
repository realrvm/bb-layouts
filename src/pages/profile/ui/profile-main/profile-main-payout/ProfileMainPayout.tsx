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
        <h3 className="heading-5">В течении 20 мин. с вами свяжется наш менеджер</h3>
      </ProfileMainApplicationWrapper>
    </>
  );
};

export default ProfileMainPayout;
