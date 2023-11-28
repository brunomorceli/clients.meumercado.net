import { Navigate, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import AdminsRoutes from 'src/modules/admins/pages/Routes';

export default function RoutesComponent() {
  return (
  <Routes>
    <Route path="*" element={<Navigate to="/" replace />} />
    <Route path='/' element={<Landingpage />} />
    <Route path='/admins/*' element={<AdminsRoutes />} />

  </Routes>
  );
  /*
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />}/>
      <Route path='/' element={<Dashboard />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/orders' element={<Orders />} />
    </Routes>
  );*/
};
