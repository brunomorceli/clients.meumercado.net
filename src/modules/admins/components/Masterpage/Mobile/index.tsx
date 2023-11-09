import { ReactNode, useState } from "react";
import { FlexboxGrid } from "rsuite";
import { useRouter } from "next/router";
import { Appbar } from "../Appbar";
import { ContentContainer } from "./styles";
import { MenuMobile } from "../Menu/Mobile";

interface MobileMasterpageProps {
  children: ReactNode | null | undefined;
  onSignout?: () => void;
}
export function MobileMasterpage(props: MobileMasterpageProps) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  function handleSignout(): void {
    props.onSignout && props.onSignout();
    setOpen(false);
  }

  return (
    <>
      <Appbar onHome={() => router.replace("/admins")} onMenu={() => setOpen(true)} />
      <MenuMobile open={open} onClose={() => setOpen(false)} onSignout={handleSignout}  />
      <FlexboxGrid justify="space-between" align="top">
        <ContentContainer md={24} lg={24} xl={24} xxl={24}>
          {props.children}
        </ContentContainer>
      </FlexboxGrid>
    </>
  );
}
