import { Col, FlexboxGrid, Message, Placeholder } from "rsuite";
import {
  CancelButton,
  ConfirmModal,
  EPlan,
  EPlanHandler,
  GeneralUtils,
  ISubscription,
  InputText,
  PanelBase,
  PlusButton,
  TitleBase,
  useToasterStore,
} from "src/modules/shared";

import { Field, Label } from "./styles";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useAuthStore } from "../../stores";
import { UpdateSubscriptionPageHandler } from "../../pages/Plans/UpdateSubscriptionPage";
import { useNavigate } from "react-router-dom";

export function SubscriptionDetails() {
  const navigate = useNavigate();
  const authStore = useStore(useAuthStore);
  const toasterStore = useStore(useToasterStore);
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [confirmText, setConfirmText] = useState<string | null>(null);

  useEffect(() => {
    loadSubscription();
  }, []);

  function loadSubscription() {
    authStore
      .getSubscription()
      .then((sub) => setSubscription(sub))
      .catch((e) => toasterStore.error(e));
  }

  function handleConfirm(): void {
    setConfirmText(null);
    console.log("-------------------- confirm unsubscribe");
  }

  if (!subscription) {
    return <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} active />;
  }

  const isTrial = subscription.plan === EPlan.TRIAL;
  const { isActive, isCancelled } = subscription;
  const planLabel = EPlanHandler.label(subscription.plan);
  const expiredAt = GeneralUtils.localTime(subscription.expiredAt);
  return (
    <>
      <TitleBase title="Meu Plano" onBack={() => navigate("/")} />
      <PanelBase title="Assinatura atual">
        <FlexboxGrid justify="space-between">
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Label>Plano</Label>
            <Field style={{ color: EPlanHandler.color(subscription.plan) }}>
              {planLabel}
            </Field>
          </Col>
          {isActive && (
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Label>
                {isTrial || isCancelled ? "Termina em:" : "Próxima fatura:"}
              </Label>
              <Field>{expiredAt}</Field>
            </Col>
          )}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Label>Status</Label>
            <Field style={{ color: isActive ? "#689F38" : "#90A4AE" }}>
              {isActive ? "Ativo" : isCancelled ? "Cancelado" : "Expirado"}
            </Field>
          </Col>
          {isCancelled && (
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Label>Cancelado em:</Label>
              <Field>{GeneralUtils.localTime(subscription.cancelledAt)}</Field>
            </Col>
          )}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <FlexboxGrid justify="end">
              {(isActive || subscription.plan !== EPlan.ADVANCED) && (
                <PlusButton
                  title={isActive ? "Atualizar Plano" : "Reativar Plano"}
                  onClick={() =>
                    navigate(UpdateSubscriptionPageHandler.navigate())
                  }
                  options={{
                    style: {
                      backgroundColor: "#1976D2",
                      color: "white",
                      marginLeft: 10,
                    },
                  }}
                />
              )}

              {isActive && (
                <CancelButton
                  title="Cancelar assinatura"
                  onClick={() => setConfirmText("")}
                  options={{
                    style: {
                      backgroundColor: "#ffffff00",
                      color: "#E64A19",
                      marginLeft: 10,
                    },
                  }}
                />
              )}
            </FlexboxGrid>
          </Col>
        </FlexboxGrid>
        <ConfirmModal
          title="Cancelar plano"
          open={confirmText !== null}
          disableConfirm={
            confirmText?.toLowerCase() !== planLabel.toLocaleLowerCase()
          }
          onClose={() => setConfirmText(null)}
          onConfirm={handleConfirm}
        >
          {isActive && (
            <Message
              showIcon
              type="warning"
              header="Informações importantes:"
              style={{ marginBottom: 20 }}
            >
              <ul>
                <li>
                  Você continuará utilizando todos os recursos normalmente até a
                  data de <b>{expiredAt}</b>.
                </li>
                <li>Depois deste período, sua conta será congelada.</li>
                <li>
                  A qualquer momento você poderá efetuar uma nova assinatura.
                </li>
              </ul>
            </Message>
          )}
          <InputText
            label={`Para confirmar, digite o nome do plano:`}
            options={{ placeholder: planLabel }}
            value={confirmText || ""}
            onChange={(i) => setConfirmText(i || "")}
          />
        </ConfirmModal>
      </PanelBase>
    </>
  );
}
