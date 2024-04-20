import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AdminMasterpage } from "src/modules/admins/components";
import { useStore } from "zustand";
import { useAuthStore, useRequestStore } from "../stores";
import CredentialsSigninPage, {
  CredentialsSigninHandler,
} from "./Credentials/CredentialsSigninPage";
import CredentialsSignupPage, {
  CredentialsSignupHandler,
} from "./Credentials/CredentialsSignupPage";
import CredentialsConfirmPage, {
  CredentialsConfirmHandler,
} from "./Credentials/CredentialsConfirmPage";
import HomePage, { HomePageHandler } from "./HomePage";
import CompaniesPage, { CompaniesHandler } from "./Companies/CompaniesPage";
import CustomersPage, { CustomersHandler } from "./Customers/CustomersPage";
import CustomersCreatePage, {
  CustomersCreateHandler,
} from "./Customers/CustomersCreatePage";
import CustomersDetailsPage, {
  CustomersDetailsHandler,
} from "./Customers/CustomersDetailsPage";
import OrdersPage, { OrdersHandler } from "./Orders/OrdersPage";
import OrdersDetailsPage, {
  OrdersDetailsHandler,
} from "./Orders/OrdersDetailsPage";
import ProductsPage, { ProductsHandler } from "./Products/ProductsPage";
import ProductsCreatePage, {
  ProductsCreateHandler,
} from "./Products/ProductsCreatePage";
import ProductsEditPage, {
  ProductsEditHandler,
} from "./Products/ProductsEditPage";
import ThemePage, { ThemePageHandler } from "./ThemePage";
import PlansPage, { PlansPageHandler } from "./Plans/PlansPage";
import { useEffect } from "react";

export default function AdminsRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const requestStore = useStore(useRequestStore);
  const authStore = useStore(useAuthStore);
  const { authenticated, paymentRerquired } = authStore;

  useEffect(() => {
    if (requestStore.errorStatus === 402) {
      authStore.setPaymentRequired(true);
    }
  }, [requestStore]);

  if (!authenticated) {
    return (
      <Routes>
        <Route
          path="/*"
          element={<Navigate to={CredentialsSigninHandler.route()} replace />}
        />
        <Route
          path={CredentialsSigninHandler.route()}
          element={<CredentialsSigninPage />}
        />
        <Route
          path={CredentialsSignupHandler.route()}
          element={<CredentialsSignupPage />}
        />
        <Route
          path={CredentialsConfirmHandler.route()}
          element={<CredentialsConfirmPage />}
        />
      </Routes>
    );
  }

  if (authStore.paymentRerquired) {
    return (
      <AdminMasterpage>
        <Routes>
          <Route
            path="/*"
            element={<Navigate to={PlansPageHandler.route()} replace />}
          />
          <Route path={PlansPageHandler.route()} element={<PlansPage />} />
          <Route path={CompaniesHandler.route()} element={<CompaniesPage />} />
        </Routes>
      </AdminMasterpage>
    );
  }

  return (
    <AdminMasterpage>
      <Routes>
        <Route
          path="/*"
          element={<Navigate to={HomePageHandler.route()} replace />}
        />
        <Route path={HomePageHandler.route()} element={<HomePage />} />

        <Route path={CompaniesHandler.route()} element={<CompaniesPage />} />

        <Route path={CustomersHandler.route()} element={<CustomersPage />} />
        <Route
          path={CustomersCreateHandler.route()}
          element={<CustomersCreatePage />}
        />
        <Route
          path={CustomersDetailsHandler.route()}
          element={<CustomersDetailsPage />}
        />

        <Route path={OrdersHandler.route()} element={<OrdersPage />} />
        <Route
          path={OrdersDetailsHandler.route()}
          element={<OrdersDetailsPage />}
        />

        <Route path={ProductsHandler.route()} element={<ProductsPage />} />
        <Route
          path={ProductsCreateHandler.route()}
          element={<ProductsCreatePage />}
        />
        <Route
          path={ProductsEditHandler.route()}
          element={<ProductsEditPage />}
        />

        <Route path={PlansPageHandler.route()} element={<PlansPage />} />

        <Route path={ThemePageHandler.route()} element={<ThemePage />} />
      </Routes>
    </AdminMasterpage>
  );
}
