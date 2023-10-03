import { useProductStore } from "@root/modules/customers/stores";
import { IProduct, useToasterStore } from "@root/modules/shared";
import { useState } from "react";
import { AutoComplete, Avatar, InputGroup } from "rsuite";
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


  function handleSearch(val: string): void {
    const filtered = (val || '').replace(/\s+$/, ' ');
  
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
    setDebouceId(setTimeout(() => {
      productStore
        .find({ label: slug, limit: props.limit || 10 })
        .then((res) => {
          cache[slug] = res;
          setProducts(res.data);
        })
        .catch(toasterStore.error);
    }, debounce));
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

          return (
            <div
              style={{ verticalAlign: "middle" }}
              onClick={() => props.onPick(product!)}
            >
              <Avatar src={img} style={{ verticalAlign: 'middle' }} />
              &nbsp;
              {product?.label}
            </div>
          );
        }}
      />
      <InputGroup.Button tabIndex={-1}>
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>
  );
}
