import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Landingpage from "src/modules/landingpage/pages/Landingpage";
import AdminsRoutes from "src/modules/admins/pages/Routes";
import CustomersRoutes from "src/modules/customers/pages/Routes";
import { GeneralUtils } from "src/modules/shared";

export default function RoutesComponent() {
  const subdomain = GeneralUtils.getSubdomain(window.location.href);
  const location = useLocation();

  if (!subdomain) {
    if (location.pathname.indexOf("/admins") === 0) {
      return <AdminsRoutes />;
    }

    return (
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Landingpage />} />
      </Routes>
    );
  }

  return <CustomersRoutes />;
}
