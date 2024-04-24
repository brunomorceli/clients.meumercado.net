import { ReactNode } from "react";
import {
  faBox,
  faBoxesStacked,
  faFlask,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum EPlan {
  TRIAL = "TRIAL",
  BASIC = "BASIC",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export class EPlanHandler {
  static label(plan: EPlan): string {
    switch (plan) {
      case EPlan.TRIAL:
        return "Teste";
      case EPlan.BASIC:
        return "Básico";
      case EPlan.INTERMEDIATE:
        return "Intermediário";
      case EPlan.ADVANCED:
        return "Avançado";
    }
  }

  static color(plan: EPlan): string {
    switch (plan) {
      case EPlan.TRIAL:
        return "#546E7A";
      case EPlan.BASIC:
        return "#689F38";
      case EPlan.INTERMEDIATE:
        return "#F57C00";
      case EPlan.ADVANCED:
        return "#0288D1";
    }
  }
  static icon(plan: EPlan): ReactNode {
    switch (plan) {
      case EPlan.TRIAL:
        return <FontAwesomeIcon icon={faFlask} />;
      case EPlan.BASIC:
        return <FontAwesomeIcon icon={faBox} />;
      case EPlan.INTERMEDIATE:
        return <FontAwesomeIcon icon={faBoxesStacked} />;
      case EPlan.ADVANCED:
        return <FontAwesomeIcon icon={faStore} />;
    }
  }

  static price(plan: EPlan): number {
    switch (plan) {
      case EPlan.TRIAL:
        return 0;
      case EPlan.BASIC:
        return 4999;
      case EPlan.INTERMEDIATE:
        return 9999;
      case EPlan.ADVANCED:
        return 24999;
    }
  }

  static description(plan: EPlan): string {
    switch (plan) {
      case EPlan.TRIAL:
        return "Teste gratuitamente e tire suas conclusões.";
      case EPlan.BASIC:
        return "Ideal para empresas que estão iniciando ou com um fluxo reduzido de pedidos.";
      case EPlan.INTERMEDIATE:
        return "Perfeito para empresas que já contém um fluxo de pedidos moderado.";
      case EPlan.ADVANCED:
        return "Indicado para empresas com grande fluxo de pedidos tais como hipermercados e distribuidoras.";
    }
  }

  static perks(plan: EPlan): string[] {
    switch (plan) {
      case EPlan.TRIAL:
        return ["Experimente todos os recursos por 7 dias."];
      case EPlan.BASIC:
        return [
          "Customização de tema.",
          "Dados analíticos.",
          "Até 1.000 Pedidos mensais.",
        ];
      case EPlan.INTERMEDIATE:
        return [
          "Customização de tema.",
          "Dados analíticos.",
          "Até 3.000 Pedidos mensais.",
          "Backup de dados.",
        ];
      case EPlan.ADVANCED:
        return [
          "Customização de tema.",
          "Dados analíticos.",
          "Até 3.000 Pedidos mensais.",
          "Backup de dados.",
          "Exportação de dados.",
        ];
    }
  }
}
