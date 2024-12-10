import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseAuthReturnType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const useAuth = (): UseAuthReturnType => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('jwtToken')
  );
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('jwtToken', data.access_token);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    navigate('/login');
  }, []);

  return { login, logout, isAuthenticated, error, setError };
};

export default useAuth;