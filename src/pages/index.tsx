import { GeneralUtils } from "src/modules/shared";
import { useNavigate } from 'react-router';

export default function ProductsPage() {
  const navigate = useNavigate();
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  navigate(Boolean(subdomain) ? '/customers' : '/landingpage');

  return null;
}
