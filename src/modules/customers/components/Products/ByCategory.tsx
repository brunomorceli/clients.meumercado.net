import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductCard } from "@root/modules/customers/components";
import {
  useAuthStore,
  useCartStore,
  useCompanyStore,
  useMasterpageStore,
  useProductStore,
} from "@root/modules/customers/stores";
import {
  CategoriesUtils,
  IProduct,
  TitleBase,
  useToasterStore,
} from "@root/modules/shared";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Placeholder } from "rsuite";
import { useStore } from "zustand";

const titleStyle = {
  color: "white",
  fontSize: 20,
  marginTop: 20,
  marginBottom: 20,
  padding: 10,
  borderRadius: 5,
  backgroundColor: "#8bc34a",
};

interface ProductsByCategoryProps {
  categoryId: string;
}

export function ProductsByCategory(props: ProductsByCategoryProps) {
  const router = useRouter();
  const authStore = useStore(useAuthStore);
  const cartStore = useStore(useCartStore);
  const companyStore = useStore(useCompanyStore);
  const masterpageStore = useStore(useMasterpageStore);
  const productStore = useStore(useProductStore);
  const toastStore = useStore(useToasterStore);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [processing, setProcessing] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const { companyId } = authStore;

  useEffect(() => {
    props.categoryId && loadCategories();
  }, [props.categoryId]);

  function loadCategories() {
    setProcessing(true);

    companyStore
      .get()
      .then((company) => {
        const cats = CategoriesUtils.getPlainCategories(company);
        setCategories(cats);

        const category = cats.find((cat) => cat.value === props.categoryId);
        if (!category) {
          toastStore.error("Categoria inválida");
          router.replace("/customers");
          return;
        }

        const catIds = [
          category.value,
          ...((category.children || []).map((c: any) => c.value) || []),
        ];

        loadProducts(catIds);
      })
      .catch(toastStore.error)
      .finally(() => setProcessing(false));
  }

  function loadProducts(categories: string[]): void {
    setProcessing(true);

    productStore
      .find({ categories })
      .then((res) => setProducts(res.data))
      .finally(() => setProcessing(false));
  }

  function handleAddProduct(product: IProduct): void {
    cartStore.addProduct(companyId, { quantity: 1, product });
    masterpageStore.setCart(true);
  }

  if (processing) {
    return (
      <>
        <Placeholder.Paragraph
          style={{ marginBottom: 20 }}
          graph="square"
          active
        />
        <Placeholder.Paragraph
          style={{ marginBottom: 20 }}
          graph="square"
          active
        />
        <Placeholder.Paragraph
          style={{ marginBottom: 20 }}
          graph="square"
          active
        />
      </>
    );
  }

  const categoryLabel =
    (categories.find((c) => c.value === props.categoryId) || {}).label || "N/I";
  return (
    <>
      <TitleBase title={`Categoria: ${categoryLabel}`} />
      <div style={titleStyle}>
        <FontAwesomeIcon icon={faCartShopping} />
        &nbsp; Produtos de: {categoryLabel}
      </div>

      <ProductCard
        products={[...products]}
        onAdd={handleAddProduct}
        onDetails={(p) => router.replace(`/customers/products/${p.id}/details`)}
      />
    </>
  );
}
