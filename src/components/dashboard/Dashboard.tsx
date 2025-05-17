import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserTable from './UserTable';
import { LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-slate-800">User Management Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-slate-600">
              Welcome, <span className="font-medium">{user?.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center text-slate-600 hover:text-slate-900"
            >
              <LogOut size={18} className="mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-medium text-slate-800">Users</h2>
          </div>
          <UserTable />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;