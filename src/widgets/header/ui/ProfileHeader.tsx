import { FC } from "react";

import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";
import { Logo } from "@/shared/ui/icons";
import { Container } from "@/widgets/container";
import { Widths } from "@/shared/lib/enums";
import { ProfileIconPhone } from "@/shared/ui/profile-icon-phone";
import { useIsMobile } from "../lib/hooks";

export const ProfileHeader: FC = () => {
  const { isMobile } = useIsMobile();

  return (
    <header className="h-20 md:h-[76px]">
      <Container className="h-full">
        <nav className="flex h-full items-center justify-between">
          <AppLink to="/">
            <Logo width={isMobile ? Widths.MOBILE : Widths.DESKTOP} />
          </AppLink>
          <div className="flex items-center gap-12">
            <ProfileIconPhone />
            <Button onClick={() => {}} className="btn-small">
              Получить займ
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
};
