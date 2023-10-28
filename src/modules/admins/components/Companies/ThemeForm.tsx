import { ICompany, ICompanyHandler } from "@shared/interfaces";
import { useCallback, useEffect, useState } from "react";
import {
  ColorPicker,
  PanelBase,
  SaveButton,
  TitleBase,
} from "@shared/components";
import { FlexboxGrid } from "rsuite";
import { useStore } from "zustand";
import { useToasterStore } from "@shared/stores";
import { useCompanyStore, useAuthStore } from "@admins/stores";
import { useRouter } from "next/router";

interface ProductThemeFormProps {
  companyId?: string | null | undefined;
}

export function ProductThemeForm(props: ProductThemeFormProps) {
  const { companyId } = props;
  const router = useRouter();
  const toasterStore = useStore(useToasterStore);
  const authStore = useStore(useAuthStore);
  const companyStore = useStore(useCompanyStore);
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());
  const loadCompany = useCallback(
    (companyId: string) => {
      companyStore
        .get(companyId)
        .then((c) => setCompany(c))
        .catch((e) => toasterStore.error(e));
    },
    [toasterStore, companyStore]
  );

  useEffect(() => {
    companyId && loadCompany(companyId);
  }, []);

  function handleChangeCompanyKey(key: string, val: any): void {
    setCompany({
      ...company,
      theme: { ...company.theme!, [key]: val },
    });
  }

  function handleSave(): void {
    companyStore
      .update(company)
      .then((updatedCompany) => {
        setCompany(updatedCompany);
        authStore.updateCompany(updatedCompany);
        toasterStore.success("Tema atualizado com sucesso.");
      })
      .catch(toasterStore.error);
  }

  return (
    <>
      <TitleBase title="Editar tema" onBack={() => router.replace("/admins")} />
      <PanelBase title="Dados da empresa">
        <strong>Cor primária</strong>
        <ColorPicker
          color={company.theme?.primaryColor!}
          onChange={(color) => handleChangeCompanyKey("primaryColor", color)}
        />
        <strong>Cor secundária</strong>
        <ColorPicker
          color={company.theme?.secondaryColor!}
          onChange={(color) => handleChangeCompanyKey("secondaryColor", color)}
        />
        <strong>Cor de destaque</strong>
        <ColorPicker
          color={company.theme?.highlightColor!}
          onChange={(color) => handleChangeCompanyKey("highlightColor", color)}
        />
        <strong>Cor de fundo</strong>
        <ColorPicker
          color={company.theme?.backgroundColor!}
          onChange={(color) => handleChangeCompanyKey("backgroundColor", color)}
        />
        <strong>Cor do texto</strong>
        <ColorPicker
          color={company.theme?.textColor!}
          onChange={(color) => handleChangeCompanyKey("textColor", color)}
        />
        <strong>Cor do texto do topo</strong>
        <ColorPicker
          color={company.theme?.headerTextColor!}
          onChange={(color) => handleChangeCompanyKey("headerTextColor", color)}
        />
      </PanelBase>
      <FlexboxGrid justify="end">
        <SaveButton onClick={handleSave} />
      </FlexboxGrid>
    </>
  );
}
