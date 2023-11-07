import { ICompany, ICompanyHandler } from "@shared/interfaces";
import { useCallback, useEffect, useState } from "react";
import {
  ColorPicker,
  PanelBase,
  SaveButton,
  TitleBase,
} from "@shared/components";
import { FlexboxGrid, Message } from "rsuite";
import { useStore } from "zustand";
import { useToasterStore } from "@shared/stores";
import { useCompanyStore, useAuthStore } from "@admins/stores";
import { useRouter } from "next/router";
import { ColorUtils } from "@root/modules/shared";
import { Container, Label } from "./styles";

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
      <TitleBase
        title="Customizar tema"
        onBack={() => router.replace("/admins")}
      />

      <Message style={{ marginTop: 20, marginBottom: 20 }} type="info">
        Você pode customizar seu negócio com poucos cliques alterando cores,
        formato, fontes e muito mais.
      </Message>

      <PanelBase title="Cores Principais">
        <Container>
          <Label>Cor primária</Label>
          <ColorPicker
            color={company.theme?.primaryColor!}
            onChange={(color) => handleChangeCompanyKey("primaryColor", color)}
          />
        </Container>
        <Container>
          <Label>Cor secundária</Label>
          <ColorPicker
            color={company.theme?.secondaryColor!}
            onChange={(color) =>
              handleChangeCompanyKey("secondaryColor", color)
            }
          />
        </Container>
        <Container>
          <Label>Cor de destaque</Label>
          <ColorPicker
            color={company.theme?.highlightColor!}
            onChange={(color) =>
              handleChangeCompanyKey("highlightColor", color)
            }
          />
        </Container>
        <Container>
          <Label>Cor do texto</Label>
          <ColorPicker
            color={company.theme?.textColor!}
            colors={ColorUtils.getColors()}
            onChange={(color) => handleChangeCompanyKey("textColor", color)}
          />
        </Container>
        <Container>
          <Label>Cor de fundo</Label>
          <ColorPicker
            color={company.theme?.backgroundColor!}
            colors={ColorUtils.getColors()}
            onChange={(color) =>
              handleChangeCompanyKey("backgroundColor", color)
            }
          />
        </Container>
      </PanelBase>

      <PanelBase title="Topo">
        <Container>
          <Label>Cor do texto do topo</Label>
          <ColorPicker
            color={company.theme?.headerTextColor!}
            colors={ColorUtils.getColors()}
            onChange={(color) =>
              handleChangeCompanyKey("headerTextColor", color)
            }
          />
        </Container>
      </PanelBase>

      <PanelBase title="Títulos">
        <Container>
          <Label>Cor do texto dos títulos</Label>
          <ColorPicker
            color={company.theme?.titleTextColor!}
            colors={ColorUtils.getColors()}
            onChange={(color) =>
              handleChangeCompanyKey("titleTextColor", color)
            }
          />
        </Container>
      </PanelBase>

      <PanelBase title="Painéis">
        <Container>
          <Label>Cor de fundo dos painéis</Label>
          <ColorPicker
            color={company.theme?.panelBackgroundColor!}
            colors={ColorUtils.getColors()}
            onChange={(color) =>
              handleChangeCompanyKey("panelBackgroundColor", color)
            }
          />
        </Container>
        <Container>
          <Label>Cor de texto dos painéis</Label>
          <ColorPicker
            color={company.theme?.panelTextColor!}
            colors={ColorUtils.getColors()}
            onChange={(color) =>
              handleChangeCompanyKey("panelTextColor", color)
            }
          />
        </Container>
      </PanelBase>

      <FlexboxGrid justify="end">
        <SaveButton onClick={handleSave} />
      </FlexboxGrid>
    </>
  );
}
