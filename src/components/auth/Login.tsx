import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, KeyRound } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <button className="btn-primary mb-4">SIGN IN</button>
        </div>
        
        <div className="auth-card rounded-lg shadow-card p-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-slate-600 flex items-center justify-center">
              <User className="text-slate-400" size={48} />
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound size={20} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-cyan-400 text-sm">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-cyan-400 text-sm hover:underline">
                Forgot your password?
              </a>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
            
            <div className="mt-4 text-center">
              <span className="text-slate-400">Don't have an account? </span>
              <Link to="/register" className="text-cyan-400 hover:underline">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;