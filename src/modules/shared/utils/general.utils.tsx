import { IUser } from "..";

export class GeneralUtils {
  static getErrorMessage(error: any, defaultMsg: string): string {
    if (
      error &&
      error.response &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      return error.response.data.message;
    }

    return defaultMsg;
  }

  static getQuantityLabel(val: number): string {
    return `${val > 1 && val < 10 ? "0" : ""}${val}`;
  }

  static getAmountLabel(cents: number): string {
    const total = cents / 100;
    return total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  static getPercentDifference(a: number, b: number): string {
    return `${Math.round(Math.abs((a - b) / ((a + b) / 100)))}%`;
  }

  static clamp(val: number, min: number, max: number = Infinity): number {
    return Math.min(Math.max(val, min), max);
  }

  static brazilianStates() {
    return [
      { label: "Acre", value: "AC" },
      { label: "Alagoas", value: "AL" },
      { label: "Amapá", value: "AP" },
      { label: "Amazonas", value: "AM" },
      { label: "Bahia", value: "BA" },
      { label: "Ceará", value: "CE" },
      { label: "Distrito Federal", value: "DF" },
      { label: "Espírito Santo", value: "ES" },
      { label: "Goiás", value: "GO" },
      { label: "Maranhão", value: "MA" },
      { label: "Mato Grosso", value: "MT" },
      { label: "Mato Grosso do Sul", value: "MS" },
      { label: "Minas Gerais", value: "MG" },
      { label: "Pará", value: "PA" },
      { label: "Paraíba", value: "PB" },
      { label: "Paraná", value: "PR" },
      { label: "Pernambuco", value: "PE" },
      { label: "Piauí", value: "PI" },
      { label: "Rio de Janeiro", value: "RJ" },
      { label: "Rio Grande do Norte", value: "RN" },
      { label: "Rio Grande do Sul", value: "RS" },
      { label: "Rondônia", value: "RO" },
      { label: "Roraima", value: "RR" },
      { label: "Santa Catarina", value: "SC" },
      { label: "São Paulo", value: "SP" },
      { label: "Sergipe", value: "SE" },
      { label: "Tocantins", value: "TO" },
    ];
  }

  static getSubdomain(url: string): string | null {
    let semProtocolo = url.replace(/^(https?:|)\/\//, '');

    let partes = semProtocolo.split('.');
    let subdominio = partes.length > 1 ? partes[0] : '';

    return subdominio;
  }

  static getSulfixLabel(val: any, separator: string = "/"): string {
    if (
      !val ||
      (typeof val === "string" && val.length === 0) ||
      val === Infinity
    ) {
      return "";
    }

    return `${separator}${val}`;
  }

  static localTime(val?: string, showTime = false, fallback = ""): string {
    if (!val) {
      return fallback;
    }

    const date = new Date(val);

    if (!showTime) {
      return date.toLocaleDateString();
    }

    const timeParts = date.toLocaleTimeString().split(":");
    return `${date.toLocaleDateString()} ${timeParts[0]}:${timeParts[1]}`;
  }

  static maskPhonenumber(phoneNumber: string): string {
    if (!phoneNumber || phoneNumber.length < 11) {
      return phoneNumber || '';
    }

    return phoneNumber.toString().replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
  }

  static maskCpfCnpj(cpfCnpj: string): string {
    let result = cpfCnpj.replace(/\D/g, '');
    if (result.length === 11) {
      return cpfCnpj.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }

    return cpfCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  static getFullAddress(user: IUser): string {
    const number = user.addressNumber || 'S/N';
    const neighborhood = `Bairro ${user.neighborhood || 'N/I'}`;

    return `${user.address}, ${number} - ${neighborhood} - ${user.city}, ${user.state} - CEP: ${user.cep}`;
  }
}
