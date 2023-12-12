import React, { useState } from "react";

import { ConfirmModal, InputQuantity } from "src/modules/shared/components";
import { GeneralUtils, ICartProduct } from "src/modules/shared";
import { SubtitleCustom, TitleCustom } from "./styles";

interface ProductCartProps {
  products: ICartProduct[];
  onChange: (product: ICartProduct) => void;
  onRemove: (product: ICartProduct) => void;
  onPick?: ((product: ICartProduct) => void);
}

export function ProductCart(props: ProductCartProps) {
  const [removeTarget, setRemoveTaget] = useState<ICartProduct | null>(null);

  function getError(cartProduct: ICartProduct): string | undefined {
    const quantity = cartProduct.quantity;
    const stock = cartProduct.product.quantity;
    
    if (cartProduct.product.unlimited) {
      return;
    }

    if (stock === 0) {
      return "O estoque deste produto está esgotado. Por favor, remove o produto.";
    }

    if (stock - quantity < 0) {
      return `A quantidade solicitada está fora de estoque (${quantity}/${stock})`;
    }
  }

  function handleRemove(product: ICartProduct): void {
    props.onRemove(product);
    setRemoveTaget(null);
  }

  return (
    <>
      {props.products.map((cartProduct, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            margin: 0,
            padding: 0,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <TitleCustom
            appearance="link"
            onClick={() => props.onPick && props.onPick(cartProduct)}
          >
            {cartProduct.product.label.toUpperCase()}
          </TitleCustom>
          <SubtitleCustom>
            Preço : {GeneralUtils.getAmountLabel(cartProduct.product.price)}
            {GeneralUtils.getSulfixLabel(
              cartProduct.product.quantitySulfix,
              " / "
            )}
          </SubtitleCustom>

          <InputQuantity
            value={cartProduct.quantity}
            max={
              cartProduct.product.unlimited
                ? Infinity
                : cartProduct.product.quantity
            }
            showLimit
            onChange={(quantity) =>
              props.onChange({ ...cartProduct, quantity })
            }
            onRemove={() => setRemoveTaget(cartProduct)}
            actionRemove
            error={getError(cartProduct)}
          />
        </div>
      ))}
      <ConfirmModal
        title="Remover produto"
        open={Boolean(removeTarget)}
        onConfirm={() => handleRemove(removeTarget!)}
        onClose={() => setRemoveTaget(null)}
      >
        Deseja realmente remover{" "}
        <strong>{removeTarget ? removeTarget.product.label : ""}</strong>?
      </ConfirmModal>
    </>
  );
}
