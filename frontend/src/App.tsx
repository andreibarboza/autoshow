import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home/index';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard/index';
import ProtectedRoute from './components/ProtectedRoute';
import CarDetails from './pages/CarDetails/index';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
      <Toaster theme="dark" position="bottom-right" richColors />
    </Router>
  );
}

export default App;
