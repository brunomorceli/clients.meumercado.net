import { Schema } from "rsuite";
import { AddressForm, AddressFormSchema } from "../Forms";
import {
  InputPhoneNumberSchema,
  InputPhoneNumber,
  InputCpfCnpjSchema,
  InputCpfCnpj,
  InputText,
} from "../Inputs";
import { IUser } from "../../interfaces";

interface UserFormProps {
  user: IUser;
  error: any;
  onChange: (user: IUser) => void;
}

export const UserFormSchema = {
  ...AddressFormSchema,
  ...InputPhoneNumberSchema,
  cpfCnpj: InputCpfCnpjSchema,
  name: Schema.Types.StringType().isRequired("Este campo é obrigatório."),
  email: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .isEmail("Email inválido."),
};

export function UserForm(props: UserFormProps) {
  const { user, error, onChange } = props;

  function handleChangeKey(key: string, value: any): void {
    onChange({ ...user, [key]: value });
  }

  return (
    <>
      <InputText
        label="Nome completo (Obrigatório)"
        value={user.name}
        onChange={(val) => handleChangeKey("name", val || "")}
        error={error.name}
      />
      <InputText
        label="Email (Obrigatório)"
        value={user.email}
        onChange={(val) => handleChangeKey("email", val || "")}
        error={error.email}
      />
      <InputPhoneNumber
        label="Telefone"
        value={user.phoneNumber}
        error={error.phoneNumber}
        onChange={(val) => handleChangeKey("phoneNumber", val || "")}
      />
      <InputCpfCnpj
        value={user.cpfCnpj}
        error={error.cpfCnpj}
        sulfixLabel=" (Obrigatório)"
        onChange={(val) => handleChangeKey("cpfCnpj", val || "")}
      />
      <AddressForm
        error={error}
        data={user}
        onChange={(data) => onChange({ ...user, ...data })}
      />
    </>
  );
}
