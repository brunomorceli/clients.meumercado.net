import { Navigate, Route, Routes } from 'react-router-dom';
import { useStore } from 'zustand';
import { useAuthStore } from 'src/modules/customers/stores';
import { CustomerMasterpage } from '../components/Masterpage';
import HompePage, { HomePageHandler } from './HompePage';
import ProductsByCategoryPage, { ProductsByCategoryPageHandler } from './Products/ProductsByCategoryPage';
import ProductDetailsPage, { ProductDetailsPageHandler } from './Products/ProductDetailsPage';
import AccountPage, { AccountPageHandler } from './Account/AccountPage';
import CheckoutPage, { CheckoutPageHandler } from './Checkout/CheckoutPage';
import FavoritesPage, { FavoritesPageHandler } from './Favorites/FavoritesPage';
import OrdersPage, { OrdersPageHandler } from './Orders/OrderPage';

export default function CustomersRoutes() {
  const authStore = useStore(useAuthStore);
  const { authenticated } = authStore;

  if (!authenticated) {
    return (
      <CustomerMasterpage>
        <Routes>
          <Route path="/*" element={<Navigate to="/" replace />} />
          <Route path={HomePageHandler.route()} element={<HompePage />} />
          <Route path={ProductsByCategoryPageHandler.route()} element={<ProductsByCategoryPage />} />
          <Route path={ProductDetailsPageHandler.route()} element={<ProductDetailsPage />} />
        </Routes>
      </CustomerMasterpage>
    );
  }

  return (
    <CustomerMasterpage>
      <Routes>
      <Route path="/*" element={<Navigate to="/" />} />
          <Route path={HomePageHandler.route()} element={<HompePage />} />

          <Route path={AccountPageHandler.route()} element={<AccountPage />} />

          <Route path={CheckoutPageHandler.route()} element={<CheckoutPage />} />

          <Route path={FavoritesPageHandler.route()} element={<FavoritesPage />} />

          <Route path={OrdersPageHandler.route()} element={<OrdersPage />} />

          <Route path={ProductsByCategoryPageHandler.route()} element={<ProductsByCategoryPage />} />
          <Route path={ProductDetailsPageHandler.route()} element={<ProductDetailsPage />} />
      </Routes>
    </CustomerMasterpage>
  );
};
