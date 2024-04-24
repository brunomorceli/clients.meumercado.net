/* eslint-disable react-hooks/exhaustive-deps */
import {
  AddressForm,
  EPlan,
  ICreditCard,
  ICreditCardHandler,
  ISubscription,
  PanelBase,
  SaveButton,
  TitleBase,
  useToasterStore,
} from "src/modules/shared";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useAuthStore } from "../../stores";
import { CreditCardForm } from "src/modules/shared/components/Forms/CreditCardForm";
import {
  IFindAddressResult,
  IFindAddressResultHandler,
} from "src/modules/shared/interfaces/find-address-result.interface";
import { Checkbox, Placeholder } from "rsuite";
import { PlanSelector } from "./PlanSelector";
import { useNavigate } from "react-router-dom";
import { SubscriptionDetailsPageHandler } from "../../pages/Plans/PlansPage";

export function UpdateSubscription() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [plan, setPlan] = useState<EPlan>(EPlan.TRIAL); // PLACEHOLDER
  const authStore = useStore(useAuthStore);
  const toasterStore = useStore(useToasterStore);
  const [card, setCard] = useState<ICreditCard>(ICreditCardHandler.empty());
  const [address, setAddress] = useState<IFindAddressResult>(
    IFindAddressResultHandler.empty()
  );
  const [billingAddress, setBillingAddress] = useState<IFindAddressResult>(
    IFindAddressResultHandler.empty()
  );
  const [sameAddress, setSameAddress] = useState<boolean>(true);

  useEffect(() => {
    loadSubscription();
  }, []);

  function loadSubscription() {
    authStore
      .getSubscription()
      .then((sub) => setSubscription(sub))
      .catch((e) => toasterStore.error(e));
  }

  function onToggleAddressCheckbox(): void {
    !sameAddress && setBillingAddress(address);
    setSameAddress(!sameAddress);
  }

  function handleChangeAddress(val: IFindAddressResult): void {
    sameAddress && setBillingAddress(val);
    setAddress(val);
  }

  if (!Boolean(subscription)) {
    return <Placeholder.Paragraph style={{ marginTop: 30 }} rows={10} active />;
  }

  return (
    <>
      <TitleBase
        title="Atualizar plano"
        onBack={() => navigate(SubscriptionDetailsPageHandler.navigate())}
      />
      <PanelBase title="Selecione o plano">
        <PlanSelector
          plan={plan}
          currentPlan={subscription!.plan}
          onChange={(p) => setPlan(p)}
        />
      </PanelBase>
      <PanelBase title="Endereço">
        <AddressForm data={address} onChange={handleChangeAddress} error={{}} />
        <Checkbox checked={sameAddress} onChange={onToggleAddressCheckbox}>
          Utilizar este mesmo endereço como endereço de combrança.
        </Checkbox>
      </PanelBase>
      {!sameAddress && (
        <PanelBase title="Endereço de combrança">
          <AddressForm
            data={billingAddress}
            onChange={(i) => setBillingAddress(i)}
            error={{}}
          />
        </PanelBase>
      )}
      <PanelBase title="Dados do cartão">
        <CreditCardForm card={card} error={null} onChange={(c) => setCard(c)} />
        <SaveButton title="validar" onClick={() => {}} />
      </PanelBase>
    </>
  );
}
