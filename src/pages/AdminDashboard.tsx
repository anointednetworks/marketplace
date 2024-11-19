import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Package, Users, Settings, LogOut } from 'lucide-react';
import { DealFormModal } from '../components/DealFormModal';
import { Deal } from '../types/deal';

export function AdminDashboard() {
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | undefined>(undefined);

  const handleCreateDeal = (data: Omit<Deal, 'id' | 'soldCount' | 'discountPercentage'>) => {
    // TODO: Implement API call
    console.log('Creating deal:', data);
    setIsModalOpen(false);
  };

  const handleEditDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600">DealSpot Admin</h2>
          </div>
          <nav className="mt-6">
            <a href="#" className="flex items-center px-6 py-3 bg-blue-50 text-blue-600">
              <Package className="h-5 w-5 mr-3" />
              Deals
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Users className="h-5 w-5 mr-3" />
              Customers
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </a>
          </nav>
          <div className="absolute bottom-0 w-64 p-6">
            <button
              onClick={logout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Deals Management</h1>
                <button 
                  onClick={() => {
                    setSelectedDeal(undefined);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Deal
                </button>
              </div>
            </div>
          </header>

          <main className="p-6">
            <div className="bg-white rounded-lg shadow p-6">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Deal</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample row */}
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=50&h=50&fit=crop"
                          alt="Spa Package"
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                        <div>
                          <div className="font-medium">Luxury Spa Package</div>
                          <div className="text-sm text-gray-500">Downtown Spa</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">Beauty & Spas</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">$99</div>
                      <div className="text-sm text-gray-500">50% off</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => handleEditDeal({
                          id: '1',
                          title: 'Luxury Spa Package',
                          description: 'Full day spa package',
                          originalPrice: 200,
                          discountedPrice: 99,
                          discountPercentage: 50,
                          imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
                          category: 'Beauty & Spas',
                          location: 'Downtown Spa',
                          endDate: '2024-04-30',
                          soldCount: 234
                        })}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      <DealFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDeal(undefined);
        }}
        onSubmit={handleCreateDeal}
        initialData={selectedDeal}
      />
    </div>
  );
}