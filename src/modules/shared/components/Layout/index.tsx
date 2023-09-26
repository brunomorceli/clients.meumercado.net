import { ReactNode } from "react";
import { Col } from "rsuite";
import { Toaster } from "..";
import { CustomFlexboxGrid } from "./styles";

interface LayoutProps {
  children: ReactNode | null | undefined;
}

export function Layout(props: LayoutProps) {
  return (
    <CustomFlexboxGrid justify="center">
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        {props.children}
      </Col>
      <Toaster />
    </CustomFlexboxGrid>
  );
}
