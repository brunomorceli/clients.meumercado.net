import { useRouter } from "next/router";
import { TitleBase } from "@shared/components";

export function Clients() {
  const router = useRouter();
  return (
    <>
      <TitleBase title="Clientes" onBack={() => router.replace('/admins')} />
    </>
  );
}