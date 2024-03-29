import { useEffect, useState } from "react";

export const useMountTransition = (
  isMounted: boolean,
  delay: number,
): boolean => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isMounted && !isTransitioning) {
      setIsTransitioning(true);
    } else if (!isMounted && isTransitioning) {
      timeoutId = setTimeout(() => setIsTransitioning(false), delay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, isMounted, isTransitioning]);

  return isTransitioning;
};
