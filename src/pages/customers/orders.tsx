import { Orders } from "src/modules/customers/components/Orders/Orders";
import { TitleBase } from "src/modules/shared/components";

export default function OrdersPage() {
  return (
    <>
      <TitleBase title="Meus pedidos" />
      <Orders />
    </>
  );
}
