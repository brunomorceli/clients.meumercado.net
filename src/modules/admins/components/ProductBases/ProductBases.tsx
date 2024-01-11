import { useState } from "react";
import {
  IProductBase,
  IProductBaseSearch,
  IProductBaseSearchResult,
  IProductBaseSearchResultHandler,
} from "src/modules/shared";
import { useStore } from "zustand";
import { useProductStore } from "src/modules/admins/stores/product.store";
import { InputSearch, PanelBase } from "src/modules/shared/components";
import { ProductBaseList } from "./List";
import { Button, FlexboxGrid, Pagination } from "rsuite";
import { useToasterStore } from "src/modules/shared/stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface ProductBasesProps {
  onPick: (productBase: IProductBase) => void;
  onBack: () => void;
}

export function ProductBases(props: ProductBasesProps) {
  const { onPick, onBack } = props;
  const productStore = useStore(useProductStore);
  const toasterStore = useStore(useToasterStore);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IProductBaseSearchResult>(
    IProductBaseSearchResultHandler.empty()
  );
  const [searching, setSearching] = useState<boolean>(false);

  function searchProducts(search: IProductBaseSearch) {
    setSearching(true);

    productStore
      .findBaseProducts(search)
      .then((result) => setSearchResult(result))
      .catch((e) => toasterStore.error(e))
      .finally(() => setSearching(false));
  }

  function handleSearch(label: string): void {
    setSearch(label);
    searchProducts({ label });
  }

  return (
    <PanelBase
      title="Produtos existentes"
      actionEl={
        <Button
          onClick={onBack}
          startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        >
          Voltar
        </Button>
      }
    >
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={24} style={{ marginBottom: 25 }}>
          <InputSearch
            loading={searching}
            placeholder="Buscar produto existente"
            onSearch={(label) => label && handleSearch(label)}
          />
        </FlexboxGrid.Item>

        {searchResult.data.length !== 0 && (
          <Pagination
            style={{ paddingBottom: 20 }}
            prev
            last
            next
            first
            maxButtons={5}
            size="lg"
            activePage={searchResult.page}
            total={searchResult.total}
            limit={searchResult.limit}
            onChangePage={(page) =>
              searchProducts({
                label: search,
                page,
              })
            }
          />
        )}
  
        <FlexboxGrid.Item colspan={24}>
          <ProductBaseList productBases={searchResult.data} onPick={onPick} />
        </FlexboxGrid.Item>

        {searchResult.data.length !== 0 && (
          <Pagination
            style={{ paddingTop: 20 }}
            prev
            last
            next
            first
            maxButtons={5}
            size="lg"
            activePage={searchResult.page}
            total={searchResult.total}
            limit={searchResult.limit}
            onChangePage={(page) =>
              searchProducts({
                label: search,
                page,
              })
            }
          />
        )}

      </FlexboxGrid>
    </PanelBase>
  );
}
