// src/components/Dashboard/OrdersDashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersDashboard.scss';

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const sampleOrders = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      date: '2024-01-15',
      address: '123 Main St, City',
      package: 'Wedding Photography Premium',
      photographerAssigned: '1',
      status: 'pending'
    },
    {
      _id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '8765432109',
      date: '2024-01-20',
      address: '456 Park Ave, Town',
      package: 'Birthday Party Basic',
      photographerAssigned: '2',
      status: 'accepted'
    },
    {
      _id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '7654321098',
      date: '2024-01-25',
      address: '789 Oak Rd, Village',
      package: 'Corporate Event Standard',
      photographerAssigned: '',
      status: 'rejected'
    },
    {
      _id: '4',
      name: 'Emily Brown',
      email: 'emily@example.com',
      phone: '6543210987',
      date: '2024-02-01',
      address: '321 Pine St, County',
      package: 'Pre-wedding Shoot',
      photographerAssigned: '3',
      status: 'pending'
    },
    {
      _id: '5',
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '5432109876',
      date: '2024-02-05',
      address: '654 Elm St, District',
      package: 'Product Photography',
      photographerAssigned: '',
      status: 'accepted'
    }
  ];

  // Sample data for employees/photographers
  const sampleEmployees = [
    { _id: '1', name: 'Alex Thompson' },
    { _id: '2', name: 'Maria Garcia' },
    { _id: '3', name: 'James Wilson' },
    { _id: '4', name: 'Lisa Chen' }
  ];

  useEffect(() => {
    // fetchOrders();
    // fetchEmployees();

    setOrders(sampleOrders);
    setEmployees(sampleEmployees);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
      setOrders(sampleOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { status: newStatus });
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePhotographerAssign = async (orderId, employeeId) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { 
        photographerAssigned: employeeId 
      });
      fetchOrders();
    } catch (error) {
      console.error('Error assigning photographer:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

//   if (loading) {
//     return <div className="loading">Loading orders...</div>;
//   }

  return (
    <div className="orders-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>Orders Management</h1>
        <div className="header-actions">
          <button className="action-btn" onClick={() => fetchOrders()}>
            Refresh
          </button>
          <button className="action-btn">
            Export CSV
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Package</th>
              <th>Date</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Photographer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.package}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <div className="contact-info">
                    <span>{order.email}</span>
                    <span>{order.phone}</span>
                  </div>
                </td>
                <td>{order.address}</td>
                <td>
                  <select
                    value={order.photographerAssigned || ''}
                    onChange={(e) => handlePhotographerAssign(order._id, e.target.value)}
                    className="photographer-select"
                  >
                    <option value="">Assign Photographer</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`status-select ${order.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button className="view-btn">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersDashboard;