import { useRouter } from "next/router";
import { Button, Divider } from "rsuite";

export default function Landingpage() {
  const router = useRouter();

  return (
    <>
      <Button appearance="primary" onClick={() => router.replace("/admins")}>
        Entrar
      </Button>
      <Divider />
      <h5>Landingpage</h5>
    </>
  );
}
