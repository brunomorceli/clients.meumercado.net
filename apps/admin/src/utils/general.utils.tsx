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

  static clamp(val: number, min: number, max: number): number {
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
}
