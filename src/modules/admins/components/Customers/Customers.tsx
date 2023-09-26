import { useRouter } from "next/router";
import { PanelBase, TitleBase } from "@shared/components";
import { useCallback, useEffect, useState } from "react";
import { IUser, PlusButton, useToasterStore } from "@root/modules/shared";
import { useStore } from "zustand";
import { useCustomerStore } from "../../stores";
import {
  Avatar,
  ButtonGroup,
  List,
  Stack,
} from "rsuite";
import UserInfoIcon from '@rsuite/icons/UserInfo';

export function Customers() {
  const router = useRouter();
  const toasterStore = useStore(useToasterStore);
  const customerStore = useStore(useCustomerStore);
  const [users, setUsers] = useState<IUser[]>([]);
  const [name, setName] = useState<string>("");
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

  return (
    <>
      <TitleBase title="Clientes" onBack={() => router.replace("/admins")} />
      <PanelBase
        title="Clientes"
        onAdd={() => router.replace("/admins/customers/create")}
      >
        <List>
          {users.map((item, index) => (
            <List.Item key={index}>
              <Stack justifyContent="space-between">
                <Stack>
                  <Stack.Item style={{ marginRight: 10 }}>
                    <Avatar>
                      <UserInfoIcon />
                    </Avatar>
                  </Stack.Item>
                  <Stack.Item>
                    <h6>
                      {item.firstName} {item.lastName}
                    </h6>
                    <span>{item.cpfCnpj}</span>
                  </Stack.Item>
                </Stack>
                <ButtonGroup>
                  <PlusButton />
                </ButtonGroup>
              </Stack>
            </List.Item>
          ))}
        </List>
      </PanelBase>
    </>
  );
}
