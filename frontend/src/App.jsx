import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PLP from './pages/PLP/PLP.jsx';
import PDP from './pages/PDP/PDP.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<PLP />} />
        <Route path="/product/:productSlug" element={<PDP />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
