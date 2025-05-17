import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
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
    <div className="min-h-screen flex items-center justify-center bg-teal-600 p-4">
      <div className="w-full max-w-md">
        {/* SIGN IN button */}
        <div className="flex justify-center mb-6">
          <div className="bg-teal-400 text-white font-medium px-16 py-3 rounded text-center">
            SIGN IN
          </div>
        </div>
        
        {/* Login card */}
        <div className="relative rounded-lg overflow-hidden shadow-xl">
          {/* Background with waves */}
          <div className="absolute inset-0 bg-blue-950 z-0">
            <div className="absolute w-full h-16 bg-blue-900/30 rounded-full -skew-y-3 top-1/4 transform"></div>
            <div className="absolute w-full h-16 bg-blue-900/30 rounded-full -skew-y-3 top-1/3 transform"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-8">
            {/* User avatar */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gray-600/40 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gray-500/70 flex items-center justify-center">
                  <User className="text-gray-400" size={48} />
                </div>
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="username"
                  className="w-full bg-blue-800/60 text-gray-300 rounded py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              {/* Password field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="password"
                  className="w-full bg-blue-800/60 text-gray-300 rounded py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between pt-1 pb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <span className="relative w-4 h-4 block bg-transparent border border-teal-400 rounded mr-2">
                    {rememberMe && (
                      <span className="absolute inset-0 flex items-center justify-center text-teal-400 text-xs">
                        ✓
                      </span>
                    )}
                  </span>
                  <span className="text-teal-400 text-sm">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-teal-400 text-sm hover:underline">
                  Forgot your password?
                </Link>
              </div>
              
              {/* Login button */}
              <button
                type="submit"
                className="w-full bg-teal-400 hover:bg-teal-500 text-white font-medium py-3 px-4 rounded transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? 'LOGGING IN...' : 'LOGIN'}
              </button>
              
              {/* Register link */}
              <div className="text-center pt-2">
                <span className="text-gray-400">Don't have an account? </span>
                <Link to="/register" className="text-teal-400 hover:underline">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;