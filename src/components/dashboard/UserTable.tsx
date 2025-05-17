import React, { useState } from 'react';
import { Settings, XCircle } from 'lucide-react';

// Mock data for the user table
const mockUsers = [
  {
    id: 1,
    name: 'Michael Holz',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    dateCreated: '04/10/2013',
    role: 'Admin',
    status: 'active',
  },
  {
    id: 2,
    name: 'Paula Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    dateCreated: '05/08/2014',
    role: 'Publisher',
    status: 'active',
  },
  {
    id: 3,
    name: 'Antonio Moreno',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    dateCreated: '11/05/2015',
    role: 'Publisher',
    status: 'suspended',
  },
  {
    id: 4,
    name: 'Mary Saveley',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    dateCreated: '06/09/2016',
    role: 'Reviewer',
    status: 'active',
  },
  {
    id: 5,
    name: 'Martin Sommer',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    dateCreated: '12/08/2017',
    role: 'Moderator',
    status: 'inactive',
  },
];

const UserTable: React.FC = () => {
  const [users] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  
  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Date Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {user.dateCreated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.status === 'active' && (
                    <span className="status-badge status-active">
                      ● Active
                    </span>
                  )}
                  {user.status === 'inactive' && (
                    <span className="status-badge status-inactive">
                      ● Inactive
                    </span>
                  )}
                  {user.status === 'suspended' && (
                    <span className="status-badge status-suspended">
                      ● Suspended
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button className="action-btn text-blue-500">
                      <Settings size={18} />
                    </button>
                    <button className="action-btn text-red-500">
                      <XCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-700">
              Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastUser, users.length)}</span> of{' '}
              <span className="font-medium">{users.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    currentPage === page
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50'
                  } text-sm font-medium`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;