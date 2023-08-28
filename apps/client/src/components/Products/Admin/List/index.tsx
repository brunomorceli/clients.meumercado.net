import { IProduct } from "@/interfaces";
import { Col } from "antd";
import { CardRow } from "./styles";
import { ProductAdminListItem } from "./Item";
import { useState } from "react";
import { ProductAdminDetails } from "./Details";

interface ProductAdminListProps {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
}

export function ProductAdminList(props: ProductAdminListProps) {
  const { products, onEdit, onRemove } = props;
  const [productDetails, setProductDetails] = useState<IProduct | null>(null);

  return (
    <>
      <CardRow>
        {products.map((item, index) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4} key={index}>
            <ProductAdminListItem
              product={item}
              onEdit={onEdit}
              onRemove={onRemove}
              onDetails={setProductDetails}
            />
          </Col>
        ))}
      </CardRow>
      <ProductAdminDetails
        product={productDetails}
        onClose={() => setProductDetails(null)}
      />
    </>
  );
}
