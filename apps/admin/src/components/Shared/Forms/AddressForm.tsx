import { Col, FlexboxGrid, Schema, Stack } from "rsuite";
import { BrazilianState, Cep, InputBase, InputNumber, TrashButton } from "..";
import {
  IFindAddressResult,
  IFindAddressResultHandler,
} from "@/interfaces/find-address-result.interface";
import { message } from "antd";

interface AddressFormProps {
  data: IFindAddressResult;
  error: IFindAddressResult;
  onChange: (data: IFindAddressResult) => void;
}

export const AddressFormSchema = {
  cep: Schema.Types.StringType()
    .isRequired("Este campo é obrigatório.")
    .minLength(8, "CEP incompleto.")
    .addRule(
      (_val, data) => Boolean(data.address && data.address.length > 0),
      "CEP inválido! Por favor, verifique o número."
    ),
};

export function AddressForm(props: AddressFormProps) {
  const { data, error, onChange } = props;

  function handleChangeKey(key: string, val: any): void {
    onChange({ ...data, [key]: val });
  }

  function handleChangeCep(cep: string): void {
    const invalid = cep.length < 8;
    onChange({ ...(invalid ? IFindAddressResultHandler.empty() : data), cep });
  }

  function handleSearchCep(address: IFindAddressResult | null): void {
    if (!address) {
      message.error("CEP não encontrado.");
      return;
    }

    onChange({ ...data, ...address });
  }

  const validated = Boolean(data.address && data.address.length !== 0);
  return (
    <>
      <Cep
        value={data.cep}
        error={error.cep}
        disabled={validated}
        onChange={(cep) => handleChangeCep(cep)}
        onSearch={(address) => handleSearchCep(address)}
      />
      {validated && (
        <FlexboxGrid justify="space-between">
          <Col xs={24} sm={24} md={20} lg={20} xl={20}>
            <InputBase
              label="Logradouro"
              value={data.address}
              options={{ disabled: true }}
              onChange={(val) => handleChangeKey("address", val)}
              error={error.address}
            />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} xl={4}>
            <InputNumber
              label="Número"
              value={data.addressNumber}
              onChange={(val) => handleChangeKey("addressNumber", val)}
              error={error.addressNumber}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <InputBase
              label="Bairro"
              value={data.neighborhood}
              options={{ disabled: true }}
              onChange={(val) => handleChangeKey("neighborhood", val)}
              error={error.neighborhood}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <InputBase
              label="Complemento"
              value={data.addressComplement}
              onChange={(val) => handleChangeKey("addressComplement", val)}
              error={error.addressComplement}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <InputBase
              label="Cidade"
              value={data.city}
              options={{ disabled: true }}
              onChange={(val) => handleChangeKey("city", val)}
              error={error.city}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <BrazilianState
              label="Estado"
              value={data.state}
              options={{ disabled: true }}
              error={error.state}
              onChange={(val) => handleChangeKey("state", val)}
            />
          </Col>
        </FlexboxGrid>
      )}
      {validated && (
        <FlexboxGrid justify="end" style={{ marginTop: 20 }}>
          <TrashButton
            title="Excluir CEP"
            onClick={() => handleChangeCep("")}
          />
        </FlexboxGrid>
      )}
    </>
  );
}
