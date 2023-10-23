import { Col } from "rsuite";

export function Col6(props: any) {
  const { children, ...rest } = props;
  return (
    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} {...rest}>
      {children}
    </Col>
  );
};

export function Col12(props: any) {
  const { children, ...rest } = props;
  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} {...rest}>
      {children}
    </Col>
  );
};

export function Col24(props: any) {
  const { children, ...rest } = props;
  return (
    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} {...rest}>
      {children}
    </Col>
  );
};