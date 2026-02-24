import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MapPage from './pages/MapPage';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import './styles/global.css';

const MagicKingdomPage = lazy(() => import('./pages/MagicKingdomPage'));
const HollywoodStudiosPage = lazy(() => import('./pages/HollywoodStudiosPage'));
const EpcotPage = lazy(() => import('./pages/EpcotPage'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/park/magic-kingdom" element={<MagicKingdomPage />} />
          <Route path="/park/hollywood-studios" element={<HollywoodStudiosPage />} />
          <Route path="/park/epcot" element={<EpcotPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
