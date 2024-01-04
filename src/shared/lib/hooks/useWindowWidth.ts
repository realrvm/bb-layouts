import { useState, useEffect } from "react";

type Width = {
  width: number;
};

/**
 * The function returns the current width of the browser window
 * @returns {object}
 */
function getWindowWidth(): Width {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

/**
 * The hook returns the current width of the browser window
 * @returns {object}
 */
export function useWindowWidth(): Width {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
