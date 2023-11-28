import { useNavigate } from "react-router";
import { useState } from "react";
import { useStore } from "zustand";
import { Avatar, FlexboxGrid, Placeholder } from "rsuite";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import EmailIcon from "@rsuite/icons/EmailFill";
import PhoneIcon from "@rsuite/icons/PhoneFill";
import MemberIcon from "@rsuite/icons/Member";

import { PanelBase, TitleBase } from "src/modules/shared/components";
import { useCustomerStore } from "src/modules/admins/stores";
import { HomePageHandler } from "src/modules/admins/pages/HomePage";
import { CustomersCreateHandler } from "src/modules/admins/pages/Customers/CustomersCreatePage";
import { CustomersDetailsHandler } from "src/modules/admins/pages/Customers/CustomersDetailsPage";
import {
  ActionList,
  IUser,
  InputAsyncSearch,
  TooltipHover,
  useToasterStore,
} from "src/modules/shared";
import { FlexboxGridItemEllipsis } from "./styles";

export function Customers() {
  const navigate = useNavigate();
  const toasterStore = useStore(useToasterStore);
  const customerStore = useStore(useCustomerStore);
  const [users, setUsers] = useState<IUser[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);

  function getLabelAmount(amount: number): string {
    return amount === 0 ? "" : ` (${amount})`;
  }

  function handleSearch(search: string, filter: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setProcessing(true);

      customerStore
        .find({ [filter]: search })
        .then((res) => resolve(res.data))
        .catch(reject)
        .finally(() => setProcessing(false));
    });
  }

  function handleRemove(customer: IUser) {
    setProcessing(true);

    customerStore
      .remove(customer.id!)
      .then(() => {
        toasterStore.success("Cliente removido com sucesso");
        setUsers(users.filter((u) => u.id !== customer.id));
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  return (
    <>
      <TitleBase
        title={`Clientes${getLabelAmount(users.length)}`}
        onBack={() => navigate(HomePageHandler.navigate())}
      />
      <PanelBase
        title="Clientes"
        onAdd={() => navigate(CustomersCreateHandler.navigate())}
        hideTitleDivider
      >
        <div style={{ marginBottom: 20 }}>
          <InputAsyncSearch
            filters={[
              { label: "Nome", value: "name" },
              { label: "Email", value: "email" },
              { label: "Telefone", value: "phoneNumber" },
              { label: "CPF/CNPJ", value: "cpfCnpj" },
            ]}
            asyncContext={handleSearch}
            onResult={setUsers}
          />
        </div>
        {processing && (
          <div>
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
          </div>
        )}
        {!processing && users.length !== 0 && (
          <ActionList
            items={users.map((user) => ({
              primary: user.name,
              secondary: (
                <FlexboxGrid justify="space-between">
                  <TooltipHover title={`Email: ${user.email}`}>
                    <FlexboxGridItemEllipsis colspan={7}>
                      <EmailIcon /> {user.email}
                    </FlexboxGridItemEllipsis>
                  </TooltipHover>

                  <TooltipHover title={`Telefone: ${user.phoneNumber!}`}>
                    <FlexboxGridItemEllipsis colspan={7}>
                      <PhoneIcon /> {user.phoneNumber}
                    </FlexboxGridItemEllipsis>
                  </TooltipHover>

                  <TooltipHover title={`CPF/CNPJ: ${user.cpfCnpj!}`}>
                    <FlexboxGridItemEllipsis colspan={7}>
                      <MemberIcon /> {user.cpfCnpj}
                    </FlexboxGridItemEllipsis>
                  </TooltipHover>
                </FlexboxGrid>
              ),
              value: user,
              prefix: (
                <Avatar>
                  <UserInfoIcon />
                </Avatar>
              ),
            }))}
            onClick={(option) =>
              navigate(CustomersDetailsHandler.navigate(option.value.id))
            }
            onRemove={(item) => handleRemove(item.value)}
          />
        )}
        {!processing && users.length === 0 && <h6>Nenhum resultado.</h6>}
      </PanelBase>
    </>
  );
}
