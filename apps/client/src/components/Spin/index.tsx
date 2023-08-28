import { LoadingOutlined } from "@ant-design/icons";
import { Container, StyleSpin, Title } from "./styles";

interface SpinProps {
  title?: string;
  spinStyle?: any;
  textStyle?: any;
}

export function Spin(props: SpinProps) {
  return (
    <Container>
      <StyleSpin indicator={<LoadingOutlined />} style={{...(props.spinStyle || {})}} />
      <Title style={{...(props.textStyle || {})}}>{props.title || 'Aguarde...'}</Title>
    </Container>
  );
}
