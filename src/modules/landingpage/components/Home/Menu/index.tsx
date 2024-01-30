import { useNavigate } from "react-router";
import { Affix, Col } from "rsuite";
import { Button, Container, Logo } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Section from "../../Section";

export default function HomeLandingpage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Section>
        <Logo src="/images/landingpage/logo-bw.svg" />
      </Section>
      <Button>
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        &nbsp; Entrar
      </Button>
      <Button>
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        &nbsp; Entrar
      </Button>
      <Button>
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        &nbsp; Entrar
      </Button>
    </Container>
  );
}
