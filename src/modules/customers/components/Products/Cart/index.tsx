"use client";

import { ConfirmModal, InputQuantity } from "@shared/components";
import { Col, FlexboxGrid, Panel, Stack } from "rsuite";
import React, { useState } from "react";
import { GeneralUtils, ICartProduct } from "@root/modules/shared";
import { SubtitleCustom, TitleCustom } from "./styles";

interface ProductCartProps {
  products: ICartProduct[];
  onChange: (product: ICartProduct) => void;
  onRemove: (product: ICartProduct) => void;
}

export function ProductCart(props: ProductCartProps) {
  const [removeTarget, setRemoveTaget] = useState<ICartProduct | null>(null);

  function handleRemove(product: ICartProduct): void {
    props.onRemove(product);
    setRemoveTaget(null);
  }

  return (
    <>
      {props.products.map((product, index) => (
        <div key={index} style={{ width: '100%', margin: 0, padding: 0, marginTop: 20, marginBottom: 20 }}>
          <TitleCustom>{product.product.label.toUpperCase()}</TitleCustom>
          <SubtitleCustom>
            Preço : {GeneralUtils.getAmountLabel(product.product.price)}{GeneralUtils.getSulfixLabel(product.product.quantitySulfix, ' / ')}
          </SubtitleCustom>

          <InputQuantity
            value={product.quantity}
            max={
              product.product.unlimited ? Infinity : product.product.quantity
            }
            showLimit
            onChange={(quantity) => props.onChange({ ...product, quantity })}
            onRemove={() => setRemoveTaget(product)}
            actionRemove
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
