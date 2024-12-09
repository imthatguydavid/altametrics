import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import LoginPage from './pages/Auth/LoginPage.tsx';
import ProtectedRoute from "./components/Routes/ProtectedRoute.tsx";
import InvoicesDashboard from "./pages/Invoices/InvoicesDashboard.tsx";
import { ThemeProvider } from "@/components/theme-provider"

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
            <Route path="/" element={<Navigate to="/invoices" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;