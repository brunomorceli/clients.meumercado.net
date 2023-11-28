import {
  IUser,
  IUserHandler,
  PanelBase,
  SaveButton,
  TitleBase,
  UserForm,
  UserFormSchema,
  useToasterStore,
} from "src/modules/shared";
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from "react";
import { FlexboxGrid, Form, Placeholder, Schema } from "rsuite";
import { useStore } from "zustand";
import { useUserStore } from "../stores";

export function Account() {
  const navigate = useNavigate();
  const userStore = useStore(useUserStore);
  const toasterStore = useStore(useToasterStore);
  const [user, setUser] = useState<IUser>(IUserHandler.empty());
  const [processing, setProcessing] = useState<boolean>(true);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const model = Schema.Model({ ...UserFormSchema });

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    setProcessing(true);

    userStore
      .self()
      .then(setUser)
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  function handleSave(): void {
    if (!formRef.current.check()) {
      toasterStore.error("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setFormError({});

    setProcessing(true);

    userStore
      .update(user)
      .then((updatedUser) => {
        toasterStore.success('Dados atualizados com sucesso.');
        setUser(updatedUser);
      })
      .catch(toasterStore.error)
      .finally(() => setProcessing(false));
  }

  if (processing) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <TitleBase
        title="Meus dados"
        onBack={() => navigate("/customers")}
      />
      <Form
        fluid={true}
        ref={formRef}
        model={model}
        formValue={user}
        formError={formError}
        onError={setFormError}
      >
        <PanelBase title="Dados pessoais">
          <UserForm user={user} onChange={setUser} error={formError} />
        </PanelBase>
        <FlexboxGrid justify="end">
          <SaveButton onClick={handleSave} />
        </FlexboxGrid>
      </Form>
    </>
  );
}
