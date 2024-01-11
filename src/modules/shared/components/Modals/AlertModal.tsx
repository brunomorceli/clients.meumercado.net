import { ReactNode } from "react";
import { Button, Modal } from "rsuite";

interface AlertModalProps {
  open?: boolean;
  title?: string | null | undefined;
  children?: ReactNode | null | undefined;
  btnText?: string | null | undefined;
  onClose?: () => void;
}

export function AlertModal(props: AlertModalProps) {
  return (
    <>
      <Modal
        role="alert"
        backdrop="static"
        open={props.open}
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
        {props.onClose &&
          <Modal.Footer>
            <Button
              appearance="primary"
              onClick={() => props.onClose && props.onClose()}
            >
              {props.btnText || "Ok"}
            </Button>
          </Modal.Footer>
        }
      </Modal>
    </>
  );
}
