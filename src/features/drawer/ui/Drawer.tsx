import { FC, ReactNode, useEffect, useRef } from "react";

import { Mods, cn } from "@/shared/lib/cn";
import { Portal } from "@/shared/ui/portal";
import { usePreventScroll } from "@/shared/lib/hooks/usePreventScroll";
import { useAppendPortalRoot } from "@/shared/lib/hooks/useAppendPortalRoot";
import { useMountTransition } from "@/shared/lib/hooks/useMountTransition";
import { createPortalRoot } from "@/shared/lib/helpers/createPortal";

import styles from "./styles.module.scss";

type DrawerProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  position?: "top";
  removeWhenClosed?: boolean;
  className?: string;
};

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  children,
  onClose,
  removeWhenClosed = true,
  position = "top",
  className,
}) => {
  const element = "drawer";

  const bodyRef = useRef<HTMLBodyElement>(document.querySelector("body"));

  const portalRootRef = useRef<HTMLElement>(
    document.getElementById(element) || createPortalRoot(element),
  );

  const isTransitioning = useMountTransition(isOpen, 300);

  useAppendPortalRoot(bodyRef, portalRootRef);
  usePreventScroll(bodyRef, isOpen);

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keyup", onKeyPress);
    }

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  const mods: Mods = {
    [styles.open]: isOpen,
    [styles.in]: isTransitioning,
  };

  return (
    <Portal element={portalRootRef.current}>
      <div className={cn(styles.bb__drawer_container, mods, [className])}>
        <div className={cn(styles.bb__drawer, {}, [styles[position]])}>
          {children}
        </div>
        <div className={styles.bb__backdrop} onClick={onClose} />
      </div>
      , portalRootRef.current, );
    </Portal>
  );
};
