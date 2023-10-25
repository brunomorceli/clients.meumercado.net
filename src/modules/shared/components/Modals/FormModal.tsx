import { ReactNode } from "react";
import { Button, Modal } from "rsuite";

interface FormModalProps {
  open?: boolean;
  title?: string | null | undefined;
  children?: ReactNode | null | undefined;
  saveText?: string | null | undefined;
  closeText?: string | null | undefined;
  onClose?: () => void;
  onSave?: () => void;
}

export function FormModal(props: FormModalProps) {
  return (
    <>
      <Modal
        role="form"
        open={props.open}
        backdrop="static"
        onClose={props.onClose}
      >
        {props.title && (
          <Modal.Header closeButton={false}>
            <Modal.Title>
              <h5>{props.title}</h5>
            </Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.onClose && props.onClose()}>
            {props.closeText || "Cancelar"}
          </Button>
          <Button
            appearance="primary"
            onClick={() => props.onSave && props.onSave()}
          >
            {props.saveText || "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
