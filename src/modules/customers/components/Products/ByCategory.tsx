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
  NoProductFoundResult,
  TitleBase,
  useToasterStore,
} from "@root/modules/shared";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pagination, Placeholder } from "rsuite";
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
  const [category, setCategory] = useState<any>({});
  const [processing, setProcessing] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const resultsPerPage = 12;

  const { companyId } = authStore;

  useEffect(() => {
    props.categoryId && loadCategories();
  }, [props.categoryId]);

  function loadCategories() {
    setProcessing(true);

    companyStore
      .get()
      .then((company) => {
        const plainCategories = CategoriesUtils.getPlainCategories(company);

        const categoryFound = plainCategories.find(
          (cat) => cat.value === props.categoryId
        );
        if (!categoryFound) {
          toastStore.error("Categoria inválida");
          router.replace("/customers");
          return;
        }

        setCategory(categoryFound);
        loadProducts([categoryFound.value], 1);
      })
      .catch(toastStore.error)
      .finally(() => setProcessing(false));
  }

  function loadProducts(categories: string[], page = 1): void {
    setProcessing(true);

    productStore
      .find({ categories, limit: resultsPerPage, page })
      .then((res) => {
        setTotal(res.total);
        setProducts(res.data);
      })
      .finally(() => setProcessing(false));
  }

  function handleAddProduct(product: IProduct): void {
    cartStore.addProduct(companyId, { quantity: 1, product });
    masterpageStore.setCart(true);
  }

  function handleChangePage(newPage: number): void {
    setPage(newPage);
    loadProducts([category.value], newPage);
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

  return (
    <>
      <TitleBase title={`Categoria: ${category.label}`} />
      <div style={titleStyle}>
        <FontAwesomeIcon icon={faCartShopping} />
        &nbsp; Produtos de: {category.label}
      </div>
      {products.length !== 0 && (
        <ProductCard
          products={[...products]}
          onAdd={handleAddProduct}
          onDetails={(p) =>
            router.replace(`/customers/products/${p.id}/details`)
          }
        />
      )}
      {products.length > resultsPerPage && (
        <Pagination
          size="lg"
          total={total}
          activePage={page}
          limit={resultsPerPage}
          onChangePage={handleChangePage}
          ellipsis
        />
      )}
      {products.length === 0 &&
        <NoProductFoundResult />
      }
    </>
  );
}
