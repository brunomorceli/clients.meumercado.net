import { ReactNode, useState } from "react";
import { FlexboxGrid } from "rsuite";
import { useNavigate } from "react-router";
import { Appbar } from "../Appbar";
import { ContentContainer } from "./styles";
import { MenuMobile } from "../Menu/Mobile";
import { HomePageHandler } from "src/modules/admins/pages/HomePage";

interface MobileMasterpageProps {
  children: ReactNode | null | undefined;
  onSignout?: () => void;
}
export function MobileMasterpage(props: MobileMasterpageProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  function handleSignout(): void {
    props.onSignout && props.onSignout();
    setOpen(false);
  }

  return (
    <>
      <Appbar
        onHome={() => navigate(HomePageHandler.navigate())}
        onMenu={() => setOpen(true)}
      />
      <MenuMobile
        open={open}
        onClose={() => setOpen(false)}
        onSignout={handleSignout}
      />
      <FlexboxGrid justify="space-between" align="top">
        <ContentContainer className="ns-content" md={24} lg={24} xl={24} xxl={24}>
          {props.children}
        </ContentContainer>
      </FlexboxGrid>
    </>
  );
}
