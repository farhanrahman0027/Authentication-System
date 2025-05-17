import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, KeyRound, Mail, Calendar } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
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
    
    // Validation
    if (!name || !email || !dateOfBirth || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(name, email, dateOfBirth, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <button className="btn-primary mb-4">SIGN UP</button>
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
                  type="text"
                  placeholder="Full Name"
                  className="form-input pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-slate-400" />
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
            
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={20} className="text-slate-400" />
                </div>
                <input
                  type="date"
                  className="form-input pl-10"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-4">
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
            
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound size={20} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-input pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </button>
            
            <div className="mt-4 text-center">
              <span className="text-slate-400">Already have an account? </span>
              <Link to="/login" className="text-cyan-400 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;