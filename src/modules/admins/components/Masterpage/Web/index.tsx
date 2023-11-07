import { ReactNode } from "react";
import { Col, FlexboxGrid, Header, Stack } from "rsuite";
import { SidenavComp } from "./SidenavComp";
import { Appbar } from "./Appbar";
import { useRouter } from "next/router";

interface WebMasterpageProps {
  children: ReactNode | null | undefined;
}
export function WebMasterpage(props: WebMasterpageProps) {
  const router = useRouter();
  return (
    <>
      <Appbar onHome={() => router.replace("/admins")} />
      <FlexboxGrid justify="space-between" align="top">
        <Col md={6} lg={6} xl={4} xxl={4} style={{ padding: 0, margin: 0 }}>
          <SidenavComp />
        </Col>
        <Col
          md={18}
          lg={18}
          xl={20}
          xxl={20}
          style={{ overflow: "hidden", overflowY: "auto", height: 'calc(100vh - 64px)' }}
        >
          {props.children}
        </Col>
      </FlexboxGrid>
    </>
  );
}
