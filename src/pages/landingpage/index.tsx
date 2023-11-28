import { useNavigate } from 'react-router';
import { Button, Divider } from "rsuite";

export default function Landingpage() {
  const navigate = useNavigate();

  return (
    <>
      <Button appearance="primary" onClick={() => navigate("/admins")}>
        Entrar
      </Button>
      <Divider />
      <h5>Landingpage</h5>
    </>
  );
}
