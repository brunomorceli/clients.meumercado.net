import { useEffect } from "react";
import { useLocation } from "react-router";

interface ScrollToTopProps {
  className: string;
}
export function ScrollToTop(props: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    Array.from(window.document.getElementsByClassName(props.className)).forEach(
      (el) => el.scrollTo(0, 0)
    );
  }, [pathname]);

  return null;
};
