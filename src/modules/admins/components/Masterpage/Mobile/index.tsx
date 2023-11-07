import { ReactNode } from "react";

interface MobileMasterpageProps {
  children: ReactNode | null | undefined;
}
export function MobileMasterpage(props: MobileMasterpageProps) {
  return (
    <>
      {props.children}
    </>
  );
}