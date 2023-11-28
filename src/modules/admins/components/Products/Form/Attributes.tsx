import { IAttribute, IAttributeHandler } from "src/modules/shared/interfaces";
import { Col, FlexboxGrid, Form, Input, Message, useToaster } from "rsuite";
import { useState } from "react";
import Slug from "slug";
import {
  ConfirmModal,
  FormModal,
  InputButton,
  PanelBase,
} from "src/modules/shared/components";

interface AttributesProps {
  attributes: IAttribute[];
  onChange: (attributes: IAttribute[]) => void;
}

export function Attributes(props: AttributesProps) {
  const toaster = useToaster();
  const [formAttribute, setFormAttribute] = useState<IAttribute | null>(null);
  const [confirmAttribute, setConfirmAttribute] = useState<IAttribute | null>(
    null
  );

  function handleChangeValue(index: number, value: string): void {
    const attributes = [...props.attributes];
    attributes[index].value = value;

    props.onChange(attributes);
  }

  function handleSaveAttribute(): void {
    const attributes = [...props.attributes];
    const attrSlug = Slug(formAttribute!.label);
    if (
      attributes.some(
        (a) => a.id !== formAttribute?.id && Slug(a.label) === attrSlug
      )
    ) {
      toaster.push(
        <Message showIcon type="error" closable>
          Já existe um atributo com o mesmo nome
        </Message>
      );
      return;
    }

    const index = attributes.findIndex((a) => a.id === formAttribute?.id);
    if (index !== -1) {
      attributes[index].label = formAttribute?.label as string;
    } else {
      attributes.push(formAttribute!);
    }

    props.onChange(attributes);
    setFormAttribute(null);
  }

  function handleRemoveAttribute(attribute: IAttribute): void {
    props.onChange(props.attributes.filter((a) => a.id !== attribute.id));
    setConfirmAttribute(null);
  }

  return (
    <>
      <PanelBase
        title={`Atributos (${props.attributes.length})`}
        onAdd={() => setFormAttribute(IAttributeHandler.empty())}
      >
        <FlexboxGrid justify="space-between">
          {props.attributes.map((item, index) => (
            <Col xs={24} sm={24} md={11} lg={11} xl={11} key={index}>
              <InputButton
                label={item.label}
                value={item.value}
                onChange={(value) => handleChangeValue(index, value)}
                onEdit={() => setFormAttribute(item)}
                onRemove={() => setConfirmAttribute(item)}
              />
            </Col>
          ))}
          {props.attributes.length === 0 && (
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <strong>Nenhum atributo cadastrado.</strong>
            </Col>
          )}
        </FlexboxGrid>
      </PanelBase>

      <FormModal
        title="Formulário de atributo"
        open={Boolean(formAttribute)}
        onClose={() => setFormAttribute(null)}
        onSave={handleSaveAttribute}
      >
        <Form.Group style={{ width: "100%" }}>
          <Form.ControlLabel>Atributo</Form.ControlLabel>
          <Input
            value={formAttribute?.label}
            onChange={(label) => setFormAttribute({ ...formAttribute!, label })}
          />
        </Form.Group>
      </FormModal>
      <ConfirmModal
        open={Boolean(confirmAttribute)}
        onConfirm={() => handleRemoveAttribute(confirmAttribute!)}
        onClose={() => setConfirmAttribute(null)}
        title="Remover atributo"
      >
        Deseja realmente remover o atributo &nbsp;
        <strong>{confirmAttribute?.label}</strong>?
      </ConfirmModal>
    </>
  );
}
