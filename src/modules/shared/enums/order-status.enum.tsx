import {
  faBoxOpen,
  faEnvelopeCircleCheck,
  faMotorcycle,
  faXmark,
  faTape,
  faTruckArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export enum EOrderStatus {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  SHIPPING = "SHIPPING",
  DELIVERING = "DELIVERING",
  DONE = "DONE",
  CANCELED_BY_COMPANY = "CANCELED_BY_COMPANY",
  CANCELED_BY_CLIENT = "CANCELED_BY_CLIENT",
}

export class EOrderStatusHandler {
  static label(status: EOrderStatus): string {
    switch (status) {
      case EOrderStatus.PENDING:
        return "Aguardando resposta";
      case EOrderStatus.PREPARING:
        return "Em preparo";
      case EOrderStatus.SHIPPING:
        return "Em trânsito";
      case EOrderStatus.DELIVERING:
        return "Rota de entrega";
      case EOrderStatus.DONE:
        return "Entregue";
      case EOrderStatus.CANCELED_BY_COMPANY:
        return "Cancelado pelo estabelecimento";
      case EOrderStatus.CANCELED_BY_CLIENT:
        return "Cancelado pelo cliente";
    }
  }

  static color(status: EOrderStatus): string {
    switch (status) {
      case EOrderStatus.PENDING:
        return "#59c3dd";
      case EOrderStatus.PREPARING:
        return "#283593";
      case EOrderStatus.SHIPPING:
        return "#ffa600";
      case EOrderStatus.DELIVERING:
        return "#558b2f";
      case EOrderStatus.DONE:
        return "#039be5";
      case EOrderStatus.CANCELED_BY_COMPANY:
        return "#e64a19";
      case EOrderStatus.CANCELED_BY_CLIENT:
        return "#e64a19";
    }
  }

  static icon(status: EOrderStatus): ReactNode {
    const style = { color: this.color(status) };
    let icon: any = null;
    switch (status) {
      case EOrderStatus.PENDING:
        icon = faEnvelopeCircleCheck;
        break;
      case EOrderStatus.PREPARING:
        icon = faTape;
        break;
      case EOrderStatus.SHIPPING:
        icon = faTruckArrowRight;
        break;
      case EOrderStatus.DELIVERING:
        icon = faMotorcycle;
        break;
      case EOrderStatus.DONE:
        icon = faBoxOpen;
        break;
      case EOrderStatus.CANCELED_BY_COMPANY:
        icon = faXmark;
        break;
      case EOrderStatus.CANCELED_BY_CLIENT:
        icon = faXmark;
        break;
    }

    return <FontAwesomeIcon icon={icon} style={style} />;
  }
}
