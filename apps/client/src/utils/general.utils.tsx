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
    return `${val > 1 && val < 10 ? '0' : ''}${val}`;
  }
  
  static getAmountLabel(cents: number): string {
    const total = cents / 100;
    return total.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL' });
  }

  static getPercentDifference(a: number, b: number): string {
    return `${Math.round(Math.abs((a-b) / ((a+b) / 100)))}%`;
  }

  static clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max);
  }
}
