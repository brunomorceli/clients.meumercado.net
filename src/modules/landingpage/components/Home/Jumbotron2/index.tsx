import { Col, FlexboxGrid, Row } from "rsuite";

const style = {
  color: 'white',
  paddingTop: 70,
  width: '100%',
  height: '100vh',
  backgroundColor: '#7cb305',
};

export function Jumbotron2() {
  return (
    <FlexboxGrid align="top" style={style}>
    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} style={{ padding: 0, margin: 0 }}>
      <h1>Crie sua comércio virtual em poucos cliques!</h1>
    </Col>
    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
      <h3>

    Com apenas alguns minutinhos você inicia suas atividades de forma simples, fácil, contando com o auxílio que vai desde o cadastro dos produtos até a entrega do pedido.
      </h3>
      
      <h2>Cadastre seus produtos muito rápido!</h2>
      <h4>Agilize o cadastro com mais de meio milhão de produtos pré-cadastrado para facilitar ainda mais seu negócio.</h4>

      <h2>Customização da sua plataforma!</h2>
      <h4>Você pode deixar sua loja virtual com sua cara, customizando cores, logomarca e muito mais.</h4>

      <h2>Endereço criado na hora!</h2>
      <h4>Seu cliente poderá acessar seu comércio virtual segundos após a criação da conta.</h4>

      <h2>Menu virtual e tabela de preços.</h2>
      <h4>Você pode criar sua tabela/menu de forma fácil aumentando assim a agilidade do seu negócio.</h4>
    </Col>
  </FlexboxGrid>
  );
}
