export interface ITheme {
  primaryColor: string;
  highlightColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  headerTextColor: string;
}

export class IThemeHandler {
  static empty(): ITheme {
    return {
      primaryColor: '#03a9f4',
      highlightColor: '#42a5f5',
      secondaryColor: '#eb2f96',
      backgroundColor: '#e0e0e0',
      textColor: '#434343',
      headerTextColor: '#ffffff',
    };
  }
}
