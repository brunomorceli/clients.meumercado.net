import { PublicGuard, UserForm, UserFormSchema } from "@shared/components";
import { useToasterStore } from "@shared/stores";
import { useRef, useState } from "react";
import { Schema, Form, Button } from "rsuite";
import { useStore } from "zustand";
import PlusIcon from '@rsuite/icons/Plus';
import { IUser, IUserHandler } from "@shared/interfaces";
import { ERoleType } from "@shared/enums";

interface SignupFormProps {
  onSubmit: (user: IUser) => void;
}

export function SignupForm(props: SignupFormProps) {
  const toasterStore = useStore(useToasterStore);
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>({});
  const [user, setUser] = useState<IUser>(
    IUserHandler.empty(ERoleType.CUSTOMER)
  );
  const model = Schema.Model(UserFormSchema);


  function handleSubmit(): void {
    if (!formRef.current.check()) {
      toasterStore.error("Preencha todos os campos obrigatórios.");
      return;
    }

    props.onSubmit(user);
  }

  return (
    <PublicGuard>
      <Form
        ref={formRef}
        model={model}
        formValue={user}
        formError={formError}
        onError={setFormError}
        onSubmit={handleSubmit}
      >
        <UserForm user={user} error={formError} onChange={setUser} />
        <Button appearance="primary" color="green" onClick={handleSubmit} block startIcon={<PlusIcon />} size="lg">
          Criar conta
        </Button>
      </Form>
    </PublicGuard>
  );
}
