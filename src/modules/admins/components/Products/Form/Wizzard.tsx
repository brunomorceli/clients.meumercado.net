import { useState } from "react";
import { Button, Modal } from "rsuite";
import { ProductBases } from "src/modules/admins/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCopy } from "@fortawesome/free-solid-svg-icons";
import { IProduct, IProductBase, IProductHandler } from "src/modules/shared";

interface ProductFormWizzardProps {
  open: boolean;
  onPick: (product: IProduct) => void;
  onClose: () => void;
}

export function ProductWizzardForm(props: ProductFormWizzardProps) {
  const { open, onPick, onClose } = props;

  const [step, setStep] = useState<"start" | "find">("start");

  function handlePick(productBase: IProductBase): void {
    onPick({
      ...IProductHandler.empty(),
      label: productBase.label || "",
      barcode: productBase.ean,
      pictures: productBase.picture ? [productBase.picture] : [],
    });

    onClose();
  }

  const StartContet = () => (
    <>
      <p>Como você deseja cadastrar o produto?</p>
      <div style={{ marginTop: 20 }}></div>
      <Button
        size="lg"
        appearance="primary"
        startIcon={<FontAwesomeIcon icon={faCopy} />}
        block
        onClick={() => setStep("find")}
      >
        Quero utilizar um produto existente
      </Button>
      <div style={{ marginTop: 20 }}></div>
      <Button
        size="lg"
        appearance="default"
        startIcon={<FontAwesomeIcon icon={faCartPlus} />}
        block
        onClick={onClose}
      >
        Quero criar um novo produto
      </Button>
    </>
  );

  return (
    <Modal open={open}>
      <Modal.Header closeButton={false}>
        <h4>Assistente de criação</h4>
      </Modal.Header>
      <Modal.Body>
        {step === "start" && <StartContet />}
        {step === "find" && (
          <ProductBases onPick={handlePick} onBack={() => setStep("start")} />
        )}
      </Modal.Body>
    </Modal>
  );
}
