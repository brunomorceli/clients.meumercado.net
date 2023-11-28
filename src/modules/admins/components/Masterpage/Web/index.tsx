import { ReactNode } from "react";
import { Col, FlexboxGrid } from "rsuite";
import { useNavigate } from "react-router";

import { HomePageHandler } from "src/modules/admins/pages/HomePage";
import { Appbar } from "../Appbar";
import { MenuWeb } from "../Menu/Web";
import { ContentContainer } from "./styles";

interface WebMasterpageProps {
  children: ReactNode | null | undefined;
  onSignout?: () => void;
}
export function WebMasterpage(props: WebMasterpageProps) {
  const navigate = useNavigate();

  function handleSignout() {
    props.onSignout && props.onSignout();
  }

  return (
    <>
      <Appbar onHome={() => navigate(HomePageHandler.navigate())} />
      <FlexboxGrid justify="space-between" align="top">
        <Col md={6} lg={6} xl={4} xxl={4} style={{ padding: 0, margin: 0 }}>
          <MenuWeb onSignout={handleSignout} />
        </Col>
        <ContentContainer md={18} lg={18} xl={20} xxl={20}>
          {props.children}
        </ContentContainer>
      </FlexboxGrid>
    </>
  );
}
