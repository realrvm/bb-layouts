import { FC, PropsWithChildren, memo } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileHeader } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Container } from "@/widgets/container";
import { useProfile } from "../model/api/profileApi";
import { useIsMobile } from "@/widgets/header/lib/hooks";
import { Button } from "@/shared/ui/button";
import { ButtonThemes } from "@/shared/lib/enums";
import { Chevron } from "@/shared/ui/icons";

export const Profile: FC<
  PropsWithChildren<{ title: string; isReturn?: boolean }>
> = ({ children, title, isReturn = false }) => {
  useProfile();

  const { isMobile } = useIsMobile();
  const isReturnAndMobile = isMobile && isReturn;

  return (
    <>
      <ProfileHeader />
      <Container>
        <section className="flex flex-col md:flex-row gap-6 md:gap-16 mt-4 pb-[100px] md:mt-9">
          {!isReturnAndMobile && <Sidebar />}
          <div className="flex flex-1 flex-col gap-6">
            {isReturn ? (
              <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6">
                <ProfileReturnButton path={-1}>Назад</ProfileReturnButton>
                <h3 className="heading-3 md:heading-title">{title}</h3>
              </div>
            ) : (
              <h3 className="heading-3 md:heading-title">{title}</h3>
            )}
            <div>{children}</div>
          </div>
        </section>
      </Container>
    </>
  );
};

export const ProfileReturnButton: FC<PropsWithChildren<{ path: any }>> = memo(
  ({ children, path }) => {
    const navigate = useNavigate();
    const { isMobile } = useIsMobile();

    return (
      <>
        {isMobile ? (
          <Button
            variant={ButtonThemes.ICON_SECONDARY}
            className="py-3 px-4 self-start"
            onClick={() => navigate(path)}
          >
            <Chevron />
          </Button>
        ) : (
          <Button
            variant={ButtonThemes.SECONDARY}
            className="btn-small self-start"
            icon={<Chevron />}
            onClick={() => navigate(path)}
          >
            <span className="ml-1">{children}</span>
          </Button>
        )}
      </>
    );
  },
);

export const ProfileNotProvided: FC<PropsWithChildren> = memo(
  ({ children }) => (
    <div className="py-3 px-5 rounded-lg bg-[#fff5e1] heading-5 inline-block self-start">
      {children}
    </div>
  ),
);
