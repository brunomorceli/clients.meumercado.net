"use client";

import { ConfirmModal, InputQuantity } from "@shared/components";
import { FlexboxGrid } from "rsuite";
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
        <>
          <FlexboxGrid key={index} justify="space-between" style={{ marginBottom: 15, marginTop: 15 }}>
            <FlexboxGrid.Item colspan={13}>
              <TitleCustom>{product.product.label}</TitleCustom>
              <SubtitleCustom>{GeneralUtils.getAmountLabel(product.product.price)}</SubtitleCustom>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={9}>
              <InputQuantity
                label="Qtd."
                value={product.quantity}
                max={
                  product.product.unlimited ? Infinity : product.product.quantity
                }
                showLimit
                onChange={(quantity) => props.onChange({ ...product, quantity })}
                onRemove={() => setRemoveTaget(product)}
                actionRemove
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </>
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
