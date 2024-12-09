import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx'; // Ensure the path is correct
import LoginPage from './pages/Auth/LoginPage.tsx'; // Ensure the path is correct
import ProtectedRoute from "./components/Routes/ProtectedRoute.tsx";
import InvoicesDashboard from "./pages/Invoices/InvoicesDashboard.tsx";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <InvoicesDashboard/>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;