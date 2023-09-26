import { GeneralUtils } from "@root/modules/shared";
import { useRouter } from "next/router";
import { Button, Divider } from "rsuite";

export default function ProductsPage() {
  const router = useRouter();
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL as string;
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  if (subdomain) {
    return (
      <>
        <Divider />
        <h5>Produtos de: {subdomain}</h5>
      </>
    );
  }

  return (
    <>
      <Button
        appearance="primary"
        onClick={() => router.replace('/admins')}
      >
        Entrar
      </Button>
      <Divider />
      <h5>Landingpage</h5>
    </>
  );
}
