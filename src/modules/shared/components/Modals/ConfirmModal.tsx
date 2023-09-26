import { ReactNode } from "react";
import { Button, Modal } from "rsuite";

interface ConfirmModalProps {
  open?: boolean;
  title?: string | null | undefined;
  children?: ReactNode | null | undefined;
  confirmText?: string | null | undefined;
  cancelText?: string | null | undefined;
  onClose?: () => void;
  onConfirm?: () => void;
}

export function ConfirmModal(props: ConfirmModalProps) {
  return (
    <>
      <Modal role="dialog" open={props.open} backdrop="static">
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
            {props.cancelText || "Cancelar"}
          </Button>
          <Button
            appearance="primary"
            onClick={() => props.onConfirm && props.onConfirm()}
          >
            {props.confirmText || "Confirmar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
