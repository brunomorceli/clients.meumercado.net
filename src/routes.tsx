import { Navigate, Route, Routes } from 'react-router-dom';

export default function RouteComponent() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />}/>
      <Route path="/admins/*" element={<Navigate to="/admins" replace />}/>
      <Route path="/customers/*" element={<Navigate to="/admins" replace />}/>
    </Routes>
  );
};
