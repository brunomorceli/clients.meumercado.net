import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import HomeLandingpage from "src/modules/landingpage/components/Home";
import AdminsRoutes from "src/modules/admins/pages/Routes";
import CustomersRoutes from "src/modules/customers/pages/Routes";
import { GeneralUtils } from "src/modules/shared";

export default function RoutesComponent() {
  const location = useLocation();
  const subdomain = GeneralUtils.getSubdomain(window.location.hostname);

  if (!subdomain) {
    if (location.pathname.indexOf("/admins") === 0) {
      return <AdminsRoutes />;
    }

    return (
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<HomeLandingpage />} />
      </Routes>
    );
  }

  return <CustomersRoutes />;
}
