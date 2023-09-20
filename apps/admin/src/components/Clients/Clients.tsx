import { useRouter } from "next/router";
import { TitleBase } from "..";

export function Clients() {
  const router = useRouter();
  return (
    <>
      <TitleBase title="Clientes" onBack={() => router.replace('/')} />
    </>
  );
}