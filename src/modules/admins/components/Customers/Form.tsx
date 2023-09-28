import { FlexboxGrid, Form, Placeholder, Schema } from "rsuite";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ERoleType,
  IUser,
  IUserHandler,
  PanelBase,
  SaveButton,
  TitleBase,
  UserForm,
  UserFormSchema,
  useToasterStore,
} from "@shared";
import { useStore } from "zustand";
import { useCustomerStore } from "@root/modules/admins/stores";
import { useRouter } from "next/router";

interface UserFormProps {
  userId?: string | null | undefined;
}

export function CustomerForm(props: UserFormProps) {
  const { userId } = props;
  const router = useRouter();
  const toasterStore = useStore(useToasterStore);
  const customerStore = useStore(useCustomerStore);
  const [user, setUser] = useState<IUser>(
    IUserHandler.empty(ERoleType.CUSTOMER)
  );
  const [processing, setProcessing] = useState<boolean>(false);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const loadUser = useCallback(
    (userId: string) => {
      setProcessing(true);

      customerStore
        .get(userId)
        .then(setUser)
        .catch(toasterStore.error)
        .finally(() => setProcessing(false));
    },
    [customerStore, toasterStore]
  );

  useEffect(() => {
    userId && loadUser(userId);
  }, [userId, loadUser]);

  const model = Schema.Model(UserFormSchema);

  function handleSave(): void {
    if (!formRef.current.check()) {
      return;
    }

    setFormError({});

    setProcessing(true);

    const method = user.id ? customerStore.update : customerStore.create;
    method(user)
      .then((data) => {
        setUser(data);
        toasterStore.success("Cliente salvo com sucesso");
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  if (processing) {
    return <Placeholder.Paragraph style={{ marginTop: 30 }} rows={10} active />;
  }

  return (
    <Form
      fluid={true}
      ref={formRef}
      model={model}
      formValue={user}
      formError={formError}
      onError={setFormError}
    >
      <TitleBase
        title={user.id ? "Dados do cliente" : "Novo cliente"}
        onBack={() => router.replace("/admins/customers")}
      />
      <PanelBase title="Cliente">
        <UserForm user={user} error={formError} onChange={setUser} />
      </PanelBase>

      <FlexboxGrid justify="end">
        <SaveButton onClick={handleSave} />
      </FlexboxGrid>
    </Form>
  );
}
