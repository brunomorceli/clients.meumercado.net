import { ReactNode } from "react";
import { Modal } from "rsuite";

interface ConfirmModalProps {
  open?: boolean;
  title?: string | null | undefined;
  options?: any;
  children?: ReactNode | null | undefined;
  onClose?: () => void;
}

export function CredentialsModal(props: ConfirmModalProps) {
  return (
    <>
      <Modal role="" open={props.open} backdrop="static" {...props.options || {}}>
        <Modal.Header onClose={props.onClose}>
          <Modal.Title>
            <h5>{props.title || "Entrar"}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
    </>
  );
}
