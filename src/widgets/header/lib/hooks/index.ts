import { useWindowWidth } from "@/shared/lib/hooks/useWindowWidth";

export function useIsMobile() {
  const { width } = useWindowWidth();

  const isMobile = width < 768;

  return { isMobile };
}
