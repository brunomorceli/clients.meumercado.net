import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router';
import { Button, Col, FlexboxGrid } from "rsuite";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <FlexboxGrid style={{ width: "100%" }} justify="center" align="middle">
        <Col xs={20} sm={20} md={20} lg={12} xl={12} xxl={12}>
          <img alt="not-found" src="/404.svg" style={{ width: "100%" }} />
        </Col>
      </FlexboxGrid>
      <FlexboxGrid justify="center">
        <Button
          size="lg"
          appearance="primary"
          startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </FlexboxGrid>
    </div>
  );
}
