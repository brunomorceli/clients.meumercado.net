import RoutesComponent from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './modules/shared';
import { ScrollToTop } from './modules/shared/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
      <Toaster />
      <ScrollToTop className='ns-content' />
    </BrowserRouter>
  );
}
