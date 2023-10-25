import { useProductStore } from "@root/modules/customers/stores";
import { IProduct, useToasterStore } from "@root/modules/shared";
import { ReactNode, useState } from "react";
import { AutoComplete, Avatar, InputGroup, Stack } from "rsuite";
import { useStore } from "zustand";
import SearchIcon from "@rsuite/icons/Search";
import Slug from "slug";

const cache: any = {};

interface ProductAutocompleteProps {
  onPick: (product: IProduct) => void;
  limit?: number;
  debounce?: number;
}

export function ProductAutocomplete(props: ProductAutocompleteProps) {
  const productStore = useStore(useProductStore);
  const toasterStore = useStore(useToasterStore);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debountId, setDebouceId] = useState<any>(0);
  const debounce = props.debounce || 300;

  function getSubtitle(product: IProduct): ReactNode {
    if (product.quantity === 0) {
      return <div style={{ color: "#a3a3a3" }}>(Esgotado)</div>;
    }

    if (product.quantity === 1) {
      <div style={{ color: "#fc4c4c" }}>Último disponível.</div>;
    }

    if (product.quantity < 10) {
      <div>0{product.quantity} em estoque.</div>;
    }

    return null;
  }

  function handleSearch(val: string): void {
    const filtered = (val || "").replace(/\s+$/, " ");

    setSearch(filtered);

    const slug = Slug((filtered || "").trim());
    if (!slug || slug.length < 2) {
      setProducts([]);
      return;
    }

    if (cache[slug]) {
      setProducts(cache[slug].data);
      return;
    }

    clearTimeout(debountId);
    setDebouceId(
      setTimeout(() => {
        productStore
          .find({ label: slug, limit: props.limit || 10 })
          .then((res) => {
            cache[slug] = res;
            setProducts(res.data);
          })
          .catch(toasterStore.error);
      }, debounce)
    );
  }

  return (
    <InputGroup inside style={{ width: "100%" }}>
      <AutoComplete
        placeholder="Buscar produto..."
        data={products.map((p) => ({ label: p.slug, value: p.id }))}
        onChange={handleSearch}
        onSelect={() => setTimeout(() => setSearch(""), 20)}
        value={search}
        filterBy={() => true}
        renderMenuItem={(_, item) => {
          const product = products.find((p) => p.id === item.value);
          const img = product?.pictures.length! > 0 ? product?.pictures[0] : "";
          const outOfStock =
            !product?.unlimited && (product?.quantity || 0) < 1;

          return (
            <Stack
              onClick={() => !outOfStock && props.onPick(product!)}
              justifyContent="space-between"
              alignItems="center"
            >
              <Avatar src={img} style={{ verticalAlign: "middle" }} />
              <Stack.Item flex={1} style={{ marginLeft: 5 }}>
                <div style={{ fontWeight: 500 }}>
                  {product?.label.toUpperCase()}
                </div>
                {getSubtitle(product!)}
              </Stack.Item>
            </Stack>
          );
        }}
      />
      <InputGroup.Button tabIndex={-1}>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>
  );
}
