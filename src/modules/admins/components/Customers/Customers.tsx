import { useRouter } from "next/router";
import { PanelBase, TitleBase } from "@shared/components";
import { useState } from "react";
import {
  ActionList,
  IUser,
  InputAsyncSearch,
  TooltipHover,
  useToasterStore,
} from "@root/modules/shared";
import { useStore } from "zustand";
import { useCustomerStore } from "../../stores";
import { Avatar, FlexboxGrid, Placeholder } from "rsuite";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import EmailIcon from "@rsuite/icons/EmailFill";
import PhoneIcon from '@rsuite/icons/PhoneFill';
import MemberIcon from '@rsuite/icons/Member';
import { FlexboxGridItemEllipsis } from "./styles";

export function Customers() {
  const router = useRouter();
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
        onBack={() => router.replace("/admins")}
      />
      <PanelBase
        title="Clientes"
        onAdd={() => router.replace("/admins/customers/create")}
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
              router.replace(`/admins/customers/${option.value.id}`)
            }
            onRemove={(item) => handleRemove(item.value)}
          />
        )}
        {!processing && users.length === 0 && <h6>Nenhum resultado.</h6>}
      </PanelBase>
    </>
  );
}
