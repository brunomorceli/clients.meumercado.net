import { useEffect, useState } from "react";
import { Modal, RadioTile, RadioTileGroup } from "rsuite";
import { ProductBases } from "src/modules/admins/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCopy,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { IProduct, IProductBase, IProductHandler } from "src/modules/shared";

interface ProductFormWizzardProps {
  open: boolean;
  onPick: (product: IProduct) => void;
  onClose: () => void;
}

export function ProductWizzardForm(props: ProductFormWizzardProps) {
  const { open, onPick, onClose } = props;
  const [step, setStep] = useState<"start" | "find">("start");

  useEffect(() => {
    open && setStep("start");
  }, [open]);

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
      <h5>Como você deseja cadastrar o produto?</h5>
      <div style={{ marginTop: 20 }}></div>

      <RadioTileGroup aria-label="Tipo de cadastro de produto">
        <RadioTile
          icon={<FontAwesomeIcon icon={faCopy} />}
          label="Utilizar produtos existentes"
          onClick={() => setStep("find")}
        >
          Você pode utilizar os dados de mais de meio milhão de produtos já
          cadastrados para facilitar seu cadastro.
        </RadioTile>

        <RadioTile
          icon={<FontAwesomeIcon icon={faCartPlus} />}
          label="Quero um novo cadastro."
          onClick={onClose}
        >
          Quero iniciar o cadastro de um produto totalmente do zero.
        </RadioTile>
      </RadioTileGroup>
    </>
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <h4>
          <FontAwesomeIcon icon={faWandMagicSparkles} />
          &nbsp; Assistente de criação
        </h4>
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
