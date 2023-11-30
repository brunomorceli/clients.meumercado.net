import { useNavigate } from 'react-router';
import { Button, Divider } from "rsuite";
import { HomePageHandler } from 'src/modules/admins/pages/HomePage';

export default function Landingpage() {
  const navigate = useNavigate();

  return (
    <>
      <Button appearance="primary" onClick={() => navigate(HomePageHandler.navigate())}>
        Entrar
      </Button>
      <Divider />
      <h5>Landingpage</h5>
    </>
  );
}
