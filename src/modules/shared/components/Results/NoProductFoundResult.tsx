import { Col, FlexboxGrid } from "rsuite";

export function NoProductFoundResult() {
  return (
    <FlexboxGrid justify="center" align="middle" style={{ width: "100%" }}>
      <Col xs={20} sm={20} md={20} lg={8} xl={8} xxl={8}>
        <img
          alt="product-not-found"
          src="/images/results/product-not-found.svg"
          style={{ width: "100%" }}
        />
      </Col>
    </FlexboxGrid>
  );
}
