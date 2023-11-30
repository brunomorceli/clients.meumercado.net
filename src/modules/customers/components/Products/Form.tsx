import { useEffect, useRef, useState } from "react";
import { Col, Form, Schema } from "rsuite";

import { FormModal, InputQuantity } from "src/modules/shared/components";
import {
  GeneralUtils,
  ICartProduct,
  ICartProductHandler,
} from "src/modules/shared";

interface ProductFormProps {
  product?: ICartProduct | null | undefined;
  onSave: (product: ICartProduct) => void;
  onClose: () => void;
}

export function ProductForm(props: ProductFormProps) {
  const { onSave, onClose } = props;
  const [cartProduct, setCartProduct] = useState<ICartProduct>(
    ICartProductHandler.empty()
  );
  const { product } = cartProduct;
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const max = cartProduct.product.quantity;

  useEffect(() => {
    if (props.product) {
      setCartProduct(props.product);
    } else {
      setCartProduct(ICartProductHandler.empty());
      setFormError({});
    }
  }, [props.product]);

  const model = Schema.Model({
    quantity: Schema.Types.NumberType("Este campo deve ser um número.").min(
      1,
      "A quantidade mínima é 1."
    ),
  });

  function handleChangeQuantity(val: number): void {
    const quantity = Math.min(Math.max(val, 0), max);
    setCartProduct({ ...cartProduct, quantity });
  }

  function handleSave() {
    formRef.current.check() && onSave(cartProduct);
  }

  const open = Boolean(props.product);
  const price = `${GeneralUtils.getAmountLabel(
    product.price
  )}${GeneralUtils.getSulfixLabel(product.quantitySulfix)}`;
  return (
    <FormModal
      title="Adicionar produto"
      open={open}
      onClose={onClose}
      onSave={handleSave}
    >
      <Form
        fluid={true}
        ref={formRef}
        model={model}
        formValue={cartProduct}
        formError={formError}
        onError={setFormError}
      >
        <Col xs={24} style={{ marginBottom: 20 }}>
          <InputQuantity
            label="Quantidade"
            value={cartProduct.quantity}
            max={max}
            showLimit
            error={formError.quantity}
            onChange={handleChangeQuantity}
          />
        </Col>
        <h4 style={{ color: "#007a00" }}>
          Total:{" "}
          {GeneralUtils.getAmountLabel(cartProduct.quantity * product.price)}
        </h4>
        <h6 style={{ color: "#b9b9b9" }}>Preço: {price}</h6>
      </Form>
    </FormModal>
  );
}
