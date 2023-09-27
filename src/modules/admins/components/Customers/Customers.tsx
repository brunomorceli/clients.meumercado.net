import { useRouter } from "next/router";
import { PanelBase, TitleBase } from "@shared/components";
import { useCallback, useEffect, useState } from "react";
import {
  ActionList,
  IUser,
  Search,
  useToasterStore,
} from "@root/modules/shared";
import { useStore } from "zustand";
import { useCustomerStore } from "../../stores";
import { Avatar } from "rsuite";
import UserInfoIcon from "@rsuite/icons/UserInfo";

export function Customers() {
  const router = useRouter();
  const toasterStore = useStore(useToasterStore);
  const customerStore = useStore(useCustomerStore);
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const loadUsers = useCallback(
    (name?: string) => {
      setProcessing(true);

      customerStore
        .find(name ? { name } : {})
        .then((res) => setUsers(res.data))
        .catch(toasterStore.error)
        .finally(() => setProcessing(false));
    },
    [customerStore, toasterStore.error, setProcessing]
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  function filterUser(user: IUser): boolean {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.indexOf((search || "").toLowerCase()) === 0;
  }

  function handleRemove(customer: IUser) {
    setProcessing(true);

    customerStore
      .remove(customer.id!)
      .then(() => {
        toasterStore.success("Cliente removido com sucesso");
        loadUsers();
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  const filteredUsers = users.filter(filterUser);

  return (
    <>
      <TitleBase title="Clientes" onBack={() => router.replace("/admins")} />
      <PanelBase
        title="Clientes"
        onAdd={() => router.replace("/admins/customers/create")}
        hideTitleDivider
      >
        <Search
          onSearch={(search) => console.log("search:", search)}
          onChange={setSearch}
        />
        <ActionList
          items={filteredUsers.map((user) => ({
            primary: `${user.firstName} ${user.lastName}`,
            secondary: user.cpfCnpj,
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
      </PanelBase>
    </>
  );
}
