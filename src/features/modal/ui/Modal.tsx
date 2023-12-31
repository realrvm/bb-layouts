import { FC, ReactNode, useEffect, useRef } from "react";

import { createPortalRoot } from "@/shared/lib/helpers/createPortal";
import { useMountTransition } from "@/shared/lib/hooks/useMountTransition";
import { useAppendPortalRoot } from "@/shared/lib/hooks/useAppendPortalRoot";
import { usePreventScroll } from "@/shared/lib/hooks/usePreventScroll";
import { Portal } from "@/shared/ui/portal";
import { Mods, cn } from "@/shared/lib/cn";

import styles from "./styles.module.scss";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  removeWhenClosed?: boolean;
  className?: string;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
  removeWhenClosed = true,
  className,
}) => {
  const element = "modal";

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
      <div className={styles.bb__modal_container}>
        <div className={cn(styles.bb__modal, mods, [className])}>
          {children}
        </div>
        <div className={styles.bb__backdrop} onClick={onClose} />
      </div>
    </Portal>
  );
};
