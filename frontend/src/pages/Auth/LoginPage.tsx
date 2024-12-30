import React, { useState } from 'react';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth.ts';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { login, isAuthenticated } = useAuth();

  const emailSchema = z.string().email('Invalid email format');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      emailSchema.parse(email);
      setError(null);
      await login(email, password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/invoices" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email:</Label>
                <Input id="email" onChange={(e) => setEmail(e.target.value)} />
                {error && <span className="text-red-500">{error}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password:</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
