import { ReactNode } from "react";
import { Col, FlexboxGrid } from "rsuite";
import { useRouter } from "next/router";
import { Appbar } from "../Appbar";
import { ContentContainer } from "./styles";
import { MenuWeb } from "../Menu/Web";

interface WebMasterpageProps {
  children: ReactNode | null | undefined;
  onSignout?: () => void;
}
export function WebMasterpage(props: WebMasterpageProps) {
  const router = useRouter();

  function handleSignout() {
    props.onSignout && props.onSignout();
  }

  return (
    <>
      <Appbar onHome={() => router.replace("/admins")} />
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
