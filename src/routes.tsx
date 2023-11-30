import { Navigate, Route, Routes } from "react-router-dom";

import Landingpage from "./pages/landingpage";
import AdminsRoutes from "src/modules/admins/pages/Routes";
import CustomersRoutes from "src/modules/customers/pages/Routes";
import { GeneralUtils } from "src/modules/shared";

export default function RoutesComponent() {
  const subdomain = GeneralUtils.getSubdomain(window.location.href);

  if (!subdomain) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Landingpage />} />
        <Route path="/admins/*" element={<AdminsRoutes />} />
      </Routes>
    );
  }

  return <CustomersRoutes />;
}
