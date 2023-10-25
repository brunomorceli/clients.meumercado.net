export enum EField {
  userName = "userName",
  cpfCnpj = "cpfCnpj",
  email = "email",
  productName = "productName",
}

export class EFieldHandler {
  static label(field: EField): string {
    switch (field) {
      case EField.userName:
        return "Nome do cliente";
      case EField.cpfCnpj:
        return "CPF";
      case EField.email:
        return "Email";
      case EField.productName:
        return "Nome do produto"; 
    }

  }
}
