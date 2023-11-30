import RoutesComponent from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './modules/shared';

export default function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
      <Toaster />
    </BrowserRouter>
  );
}
