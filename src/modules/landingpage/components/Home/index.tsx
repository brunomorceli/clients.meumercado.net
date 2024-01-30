/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faBoxesStacked,
  faDesktop,
  faFaceLaughWink,
  faPalette,
  faRectangleList,
  faRightToBracket,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { HomePageHandler } from "src/modules/admins/pages/HomePage";

export default function HomeLandingpage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="navbar-area navbar-nine">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#">
                  <img
                    src="landingpage/assets/images/white-logo.svg"
                    height={30}
                    alt="Logo"
                  />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNine"
                  aria-controls="navbarNine"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarNine"
                >
                  <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                      <a className="page-scroll active" href="#hero-area">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="page-scroll" href="#services">
                        Serviços
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="page-scroll" href="#plans">
                        Planos
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="page-scroll" href="#contact">
                        Contato
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="page-scroll"
                        href="#"
                        onClick={() => navigate(HomePageHandler.navigate())}
                      >
                        <FontAwesomeIcon icon={faRightToBracket} />
                        &nbsp; Entrar
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section id="hero-area" className="header-area header-eight">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="header-content">
                <h1>Crie seu comércio virtual em poucos cliques!</h1>
                <p>
                  Com apenas alguns minutinhos você inicia suas atividades de
                  forma simples, fácil, contando com o auxílio que vai desde o
                  cadastro dos produtos até a entrega do pedido.
                </p>
                <div className="button">
                  <div
                    className="btn primary-btn"
                    onClick={() => navigate(HomePageHandler.navigate())}
                  >
                    Comece agora
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="header-image">
                <img src="landingpage/assets/images/header/1.jpg" alt="#" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-area about-five">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-12">
              <div className="about-image-five">
                <img src="landingpage/assets/images/about/1.png" alt="about" />
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="about-five-content">
                <h6 className="small-title text-lg">OUR STORY</h6>
                <h2 className="main-title fw-bold">
                  Our team comes with the experience and knowledge
                </h2>
                <div className="about-five-tab">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active"
                        id="nav-who-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-who"
                        type="button"
                        role="tab"
                        aria-controls="nav-who"
                        aria-selected="true"
                      >
                        Who We Are
                      </button>
                      <button
                        className="nav-link"
                        id="nav-vision-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-vision"
                        type="button"
                        role="tab"
                        aria-controls="nav-vision"
                        aria-selected="false"
                      >
                        our Vision
                      </button>
                      <button
                        className="nav-link"
                        id="nav-history-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-history"
                        type="button"
                        role="tab"
                        aria-controls="nav-history"
                        aria-selected="false"
                      >
                        our History
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-who"
                      role="tabpanel"
                      aria-labelledby="nav-who-tab"
                    >
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, look like readable English.
                      </p>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have in some form, by
                        injected humour.
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-vision"
                      role="tabpanel"
                      aria-labelledby="nav-vision-tab"
                    >
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, look like readable English.
                      </p>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have in some form, by
                        injected humour.
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-history"
                      role="tabpanel"
                      aria-labelledby="nav-history-tab"
                    >
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, look like readable English.
                      </p>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have in some form, by
                        injected humour.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services-area services-eight">
        <div className="section-title-five">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content">
                  <h6>Serviços</h6>
                  <h2 className="fw-bold">Feito com carinho para você!</h2>
                  <p>
                    O Meumercado foi criado para atender aqueles que precisam de
                    simplicidade e agilidade para gerenciar seu negócio
                    independente do tamanho ou renda, seja um mercado local,
                    comércio online ou serviço, nós temos o que você precisa!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-services">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faBoxesStacked} />
                </div>
                <div className="service-content">
                  <h4>Cadastre seus produtos muito rápido!</h4>
                  <p>
                    Agilize o cadastro com mais de meio milhão de produtos
                    pré-cadastrado para facilitar ainda mais seu negócio.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-services">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faPalette} />
                </div>
                <div className="service-content">
                  <h4>Customização da sua plataforma!</h4>
                  <p>
                    Você pode deixar sua loja virtual com sua cara, customizando
                    cores, logomarca e muito mais.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-services">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faDesktop} />
                </div>
                <div className="service-content">
                  <h4>Endereço criado na hora!</h4>
                  <p>
                    Seu cliente poderá acessar seu comércio virtual segundos
                    após a criação da conta.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-services">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faRectangleList} />
                </div>
                <div className="service-content">
                  <h4>Menu virtual e tabela de preços.</h4>
                  <p>
                    Você pode criar sua tabela/menu de forma fácil aumentando
                    assim a agilidade do seu negócio.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-services">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faFaceLaughWink} />
                </div>
                <div className="service-content">
                  <h4>Facilidade para o usuário!</h4>
                  <p>
                    Simplicidade é nosso lema! Nossa plataforma é pensada para
                    facilitar e melhorar a experiência do usuário, sem grande
                    burocracia ou tempo gasto. O cliente escolhe o que quer e em
                    poucos passos faz o pedido. Perfeito para adesão até de
                    usuários mais resistentes a tecnologia.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-services">
                <div className="service-icon">
                  <FontAwesomeIcon icon={faWallet} />
                </div>
                <div className="service-content">
                  <h4>Planos que cabem no seu bolso!</h4>
                  <p>
                    Nosso objetivo é ajudar aqueles que querem empreender e
                    crescer. Nosso objetivo é crescer junto com você. Por isso
                    criamos planos simples que atendem bem a necessidade do
                    empreendedor de acordo com sua demanda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="pricing-area pricing-fourteen">
        <div className="section-title-five">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content">
                  <h6>Planos</h6>
                  <h2 className="fw-bold">Planos para cada caso</h2>
                  <p>
                    Escolha o plano que mais se encaixa em seu modelo de
                    negócio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="pricing-style-fourteen">
                <div className="table-head">
                  <h6 className="title">Iniciante</h6>
                  <p>
                    Ideal para empresas que estão iniciando ou com um fluxo
                    reduzido de pedidos.
                  </p>
                  <div className="price">
                    <h2 className="amount">
                      <span className="currency">R$</span>&nbsp;49,99
                      <span className="duration">/mês </span>
                    </h2>
                  </div>
                </div>

                <div className="light-rounded-buttons">
                  <div className="btn primary-btn-outline" onClick={() => navigate(HomePageHandler.navigate())}>
                    Testar grátis por 7 dias
                  </div>
                </div>

                <div className="table-content">
                  <ul className="table-list">
                    <li>
                      <i className="lni lni-checkmark-circle"/> Customização
                      de tema.
                    </li>
                    <li>
                      <i className="lni lni-checkmark-circle"/> Dados analíticos.
                    </li>
                    <li>
                      <i className="lni lni-checkmark-circle"/> Até 1.000
                      Pedidos mensais.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="pricing-style-fourteen middle">
                <div className="table-head">
                  <h6 className="title">Intermediário</h6>
                  <p>
                    Perfeito para empresas que já contém um fluxo de pedidos
                    moderado.
                  </p>
                  <div className="price">
                    <h2 className="amount">
                      <span className="currency">R$</span>&nbsp;99,99
                      <span className="duration">/mês </span>
                    </h2>
                  </div>
                </div>

                <div className="light-rounded-buttons">
                  <div className="btn primary-btn" onClick={() => navigate(HomePageHandler.navigate())}>
                    Testar grátis por 7 dias
                  </div>
                </div>

                <div className="table-content">
                  <ul className="table-list">
                    <li>
                      <i className="lni lni-checkmark-circle"/> Customização
                      de tema.
                    </li>
                    <li>
                      <i className="lni lni-checkmark-circle"/> Dados analíticos.
                    </li>
                    <li>
                      <i className="lni lni-checkmark-circle"/> Até 3.000
                      Pedidos mensais.
                    </li>
                    <li>
                      <i className="lni lni-checkmark-circle"/> Backup de
                      dados.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="pricing-style-fourteen">
                <div className="table-head">
                  <h6 className="title">Grandes Empresas</h6>
                  <p>Indicado para empresas com grande fluxo de pedidos tais como hipermercados e distribuidoras.</p>
                  <div className="price">
                    <h2 className="amount">
                      <span className="currency">R$</span>&nbsp;249,00
                      <span className="duration">/mês </span>
                    </h2>
                  </div>
                </div>

                <div className="light-rounded-buttons">
                  <div className="btn primary-btn-outline" onClick={() => navigate(HomePageHandler.navigate())}>
                    Testar grátis por 7 dias
                  </div>
                </div>

                <div className="table-content">
                  <ul className="table-list">
                    <li>
                      <i className="lni lni-checkmark-circle"/> Customização
                      de tema.
                    </li>
                    <li>
                      <i className="lni lni-checkmark-circle"/> Dados analíticos.
                    </li>
                    <li>
                      <i className="lni lni-checkmark-circle"/> Até 3.000
                      Pedidos mensais.
                    </li>
                    <li>
                      <i className="lni lni-checkmark-circle"/> Backup de
                      dados.
                    </li>
                    <li>
                      <i className="lni lni-checkmark-circle"/> Exportação de
                      dados.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="call-action" className="call-action">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-9">
              <div className="inner-content">
                <h2>
                  We love to make perfect <br />
                  solutions for your business
                </h2>
                <p>
                  Why I say old chap that is, spiffing off his nut cor blimey
                  guvnords geeza
                  <br />
                  bloke knees up bobby, sloshed arse William cack Richard. Bloke
                  fanny around chesed of bum bag old lost the pilot say there
                  spiffing off his nut.
                </p>
                <div className="light-rounded-buttons">
                  <div className="btn primary-btn-outline">Get Started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="blog" className="latest-news-area section">
        <div className="section-title-five">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content">
                  <h6>latest news</h6>
                  <h2 className="fw-bold">Latest News & Blog</h2>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <div className="image">
                  <div>
                    <img
                      className="thumb"
                      src="landingpage/assets/images/blog/1.jpg"
                      alt="Blog"
                    />
                  </div>
                  <div className="meta-details">
                    <img
                      className="thumb"
                      src="landingpage/assets/images/blog/b6.jpg"
                      alt="Author"
                    />
                    <span>BY TIM NORTON</span>
                  </div>
                </div>
                <div className="content-body">
                  <h4 className="title">
                    <div> Make your team a Design driven company </div>
                  </h4>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <div className="image">
                  <div>
                    <img
                      className="thumb"
                      src="landingpage/assets/images/blog/2.jpg"
                      alt="Blog"
                    />
                  </div>
                  <div className="meta-details">
                    <img
                      className="thumb"
                      src="landingpage/assets/images/blog/b6.jpg"
                      alt="Author"
                    />
                    <span>BY TIM NORTON</span>
                  </div>
                </div>
                <div className="content-body">
                  <h4 className="title">
                    <div>The newest web framework that changed the world</div>
                  </h4>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <div className="image">
                  <div>
                    <img
                      className="thumb"
                      src="landingpage/assets/images/blog/3.jpg"
                      alt="Blog"
                    />
                  </div>
                  <div className="meta-details">
                    <img
                      className="thumb"
                      src="landingpage/assets/images/blog/b6.jpg"
                      alt="Author"
                    />
                    <span>BY TIM NORTON</span>
                  </div>
                </div>
                <div className="content-body">
                  <h4 className="title">
                    <div>5 ways to improve user retention for your startup</div>
                  </h4>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="clients" className="brand-area section">
        <div className="section-title-five">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content">
                  <h6>Meet our Clients</h6>
                  <h2 className="fw-bold">Our Awesome Clients</h2>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-12">
              <div className="clients-logos">
                <div className="single-image">
                  <img
                    src="landingpage/assets/images/client-logo/graygrids.svg"
                    alt="Brand Logo Images"
                  />
                </div>
                <div className="single-image">
                  <img
                    src="landingpage/assets/images/client-logo/uideck.svg"
                    alt="Brand Logo Images"
                  />
                </div>
                <div className="single-image">
                  <img
                    src="landingpage/assets/images/client-logo/ayroui.svg"
                    alt="Brand Logo Images"
                  />
                </div>
                <div className="single-image">
                  <img
                    src="landingpage/assets/images/client-logo/lineicons.svg"
                    alt="Brand Logo Images"
                  />
                </div>
                <div className="single-image">
                  <img
                    src="landingpage/assets/images/client-logo/tailwindtemplates.svg"
                    alt="Brand Logo Images"
                  />
                </div>
                <div className="single-image">
                  <img
                    src="landingpage/assets/images/client-logo/ecomhtml.svg"
                    alt="Brand Logo Images"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="contact-item-wrapper">
                <div className="row">
                  <div className="col-12 col-md-6 col-xl-12">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="lni lni-phone"/>
                      </div>
                      <div className="contact-content">
                        <h4>Contact</h4>
                        <p>0984537278623</p>
                        <p>yourmail@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-12">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="lni lni-map-marker"/>
                      </div>
                      <div className="contact-content">
                        <h4>Address</h4>
                        <p>175 5th Ave, New York, NY 10010</p>
                        <p>United States</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-12">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="lni lni-alarm-clock"/>
                      </div>
                      <div className="contact-content">
                        <h4>Schedule</h4>
                        <p>24 Hours / 7 Days Open</p>
                        <p>Office time: 10 AM - 5:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="contact-form-wrapper">
                <div className="row">
                  <div className="col-xl-10 col-lg-8 mx-auto">
                    <div className="section-title text-center">
                      <span> Get in Touch </span>
                      <h2>Ready to Get Started</h2>
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus quiblanditiis praesentium
                      </p>
                    </div>
                  </div>
                </div>
                <form action="#" className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="subject"
                        id="email"
                        placeholder="Subject"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Type Message"
                        rows={5}
                      ></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="button text-center rounded-buttons">
                        <button
                          type="submit"
                          className="btn primary-btn rounded-full"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer-area footer-eleven">
        <div className="footer-top">
          <div className="container">
            <div className="inner-content">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="footer-widget f-about">
                    <div className="logo">
                      <a href="index.html">
                        <img
                          src="landingpage/assets/images/logo.svg"
                          alt="#"
                          className="img-fluid"
                        />
                      </a>
                    </div>
                    <p>
                      Making the world a better place through constructing
                      elegant hierarchies.
                    </p>
                    <p className="copyright-text">
                      <span>© 2024 Ayro UI.</span>Designed and Developed by
                      <div rel="nofollow"> Ayro UI </div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 col-12">
                  <div className="footer-widget f-link">
                    <h5>Solutions</h5>
                    <ul>
                      <li>
                        <div>Marketing</div>
                      </li>
                      <li>
                        <div>Analytics</div>
                      </li>
                      <li>
                        <div>Commerce</div>
                      </li>
                      <li>
                        <div>Insights</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 col-12">
                  <div className="footer-widget f-link">
                    <h5>Support</h5>
                    <ul>
                      <li>
                        <div>Pricing</div>
                      </li>
                      <li>
                        <div>Documentation</div>
                      </li>
                      <li>
                        <div>Guides</div>
                      </li>
                      <li>
                        <div>API Status</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="footer-widget newsletter">
                    <h5>Subscribe</h5>
                    <p>Subscribe to our newsletter for the latest updates</p>
                    <form
                      action="#"
                      method="get"
                      target="_blank"
                      className="newsletter-form"
                    >
                      <input
                        name="EMAIL"
                        placeholder="Email address"
                        type="email"
                      />
                      <div className="button">
                        <button className="sub-btn">
                          <i className="lni lni-envelope"/>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <a href="#" className="scroll-top btn-hover">
        <i className="lni lni-chevron-up"/>
      </a>
    </>
  );
}
