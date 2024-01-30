import { Col } from "rsuite";
import useBreakpoint from "use-breakpoint";

export default function Section(props: any) {
  const { breakpoint } = useBreakpoint(
    { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 },
    "xs"
  );

  return (
    <>
      {["lg", "xl", "xxl"].includes(breakpoint) && (
        <>
          <Col lg={3} xl={3} xxl={6} style={{ backgroundColor: 'red' }}>
            &nbsp;
          </Col>        
          <Col lg={18} xl={18} xxl={12}>
            {props.children}
          </Col>        
        </>
      )}
      {["xs", "sm", "md"].includes(breakpoint) && (
        <>
        {props.children}
      </>     
      )}

    </>
  );
}
