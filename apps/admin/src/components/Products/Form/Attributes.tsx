import { IAttribute, IAttributeHandler } from "@/interfaces";
import {
  Button,
  ButtonGroup,
  Divider,
  FlexboxGrid,
  Form,
  IconButton,
  Input,
  InputGroup,
  Message,
  Modal,
  Panel,
  Stack,
  useToaster,
} from "rsuite";
import { useState } from "react";
import Slug from "slug";
import PlusIcon from "@rsuite/icons/Plus";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";

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
      <Panel
        bordered
        shaded
        style={{ backgroundColor: "white" }}
        header={
          <>
            <Stack justifyContent="space-between">
              <h5>Atributos ({props.attributes.length})</h5>
              <ButtonGroup>
                <Button
                  appearance="default"
                  startIcon={<PlusIcon />}
                  onClick={() => setFormAttribute(IAttributeHandler.empty())}
                >
                  Adicionar
                </Button>
              </ButtonGroup>
            </Stack>
            <Divider />
          </>
        }
      >
        <FlexboxGrid justify="space-between">
          {props.attributes.map((item, index) => (
            <FlexboxGrid.Item colspan={11} key={index}>
              <Form.Group>
                <Form.ControlLabel>{item.label}</Form.ControlLabel>
                <InputGroup>
                  <Input
                    value={item.value}
                    onChange={(value) => handleChangeValue(index, value)}
                    size="sm"
                  />
                  <InputGroup.Addon>
                    <IconButton
                      icon={<EditIcon />}
                      size="sm"
                      onClick={() => setFormAttribute(item)}
                    />
                    <IconButton
                      icon={<TrashIcon />}
                      size="sm"
                      onClick={() => setConfirmAttribute(item)}
                    />
                  </InputGroup.Addon>
                </InputGroup>
              </Form.Group>
            </FlexboxGrid.Item>
          ))}
          {props.attributes.length === 0 &&
            <strong>Nenhum atributo cadastrado.</strong>
          }
        </FlexboxGrid>
      </Panel>
      <Modal
        open={Boolean(formAttribute)}
        onClose={() => setFormAttribute(null)}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Atributo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group style={{ width: "100%" }}>
            <Form.ControlLabel>Atributo</Form.ControlLabel>
            <Input
              value={formAttribute?.label}
              onChange={(label) =>
                setFormAttribute({ ...formAttribute!, label })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setFormAttribute(null)}>Cancelar</Button>
          <Button appearance="primary" onClick={handleSaveAttribute}>
            Concluir
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal role="dialog" open={Boolean(confirmAttribute)} backdrop="static">
        <Modal.Header closeButton={false}>
          <Modal.Title>Remover atributo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente remover o atributo
          &nbsp;
          <strong>{confirmAttribute?.label}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setConfirmAttribute(null)}>Cancelar</Button>
          <Button
            appearance="primary"
            onClick={() => handleRemoveAttribute(confirmAttribute!)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
