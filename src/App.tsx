import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" index element={<MainPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
