import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Customers.scss';
import { toast } from 'react-toastify';
import { CentralGovContext } from '../../context/CentralGovContext';
import { Loader } from 'lucide-react';
import PhotoLoader from '../../SubComponenets/Loader/PhotoLoader';
import { useNavigate } from 'react-router-dom';

// API Constants


const Cusomters = () => {
  const { url,adminToken } = useContext(CentralGovContext)
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate=useNavigate()

  const API_ENDPOINTS = {
    getAllBookings: `${url}/api/admin/bookings/allbookings`,
    // getAllBookings: `http://localhost:5002/api/admin/bookings/allbookings`,
    removeBooking: (orderId) => `${url}/api/admin/bookings/remove/${orderId}`,
    updateStatus: (orderId) => `${url}/api/admin/bookings/status/${orderId}`,
    assignPhotographer: (orderId) => `${url}/api/admin/bookings/assign/${orderId}`,
    getAllEmployees: `${url}/api/admin/employee/all-employees`
  };

  useEffect(() => {
    fetchOrders();
    fetchEmployees();
    console.log(url)
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.getAllBookings);
      const uniqueCustomers = [...new Map(response.data.orders.map(order => [order.email, order])).values()];
      setOrders(uniqueCustomers);
      // const uniqueCusommers=orders.

    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.getAllEmployees);
      setEmployees(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.post(API_ENDPOINTS.updateStatus(orderId), { status: newStatus });
      toast.success("Status updated")
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleRemoveOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to remove this order?')) {
      try {
        await axios.delete(API_ENDPOINTS.removeBooking(orderId));
        fetchOrders();
      } catch (error) {
        console.error('Error removing order:', error);
      }
    }
  };

  const handleExportCSV = () => {
    // Convert orders to CSV format
    const headers = ['Client Name','Email', 'Phone', 'Address'];
    const csvContent = [
      headers.join(','),
      ...orders.map(order => [
        order.name,
        order.email,
        order.address,
        employees.find(emp => emp._id === order.photographerAssigned)?.name || 'Unassigned',
        order.status
      ].join(','))
    ].join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if(!adminToken){
    return navigate('/')
  }


  return (
    <div className="customer-dashboard">
      <div className="dashboard-header">
        {loading?<PhotoLoader/>:"" }
        <h1>Orders Management</h1>
        <div className="header-actions">
          <button className="action-btn" onClick={fetchOrders}>
            Refresh
          </button>
          <button className="action-btn" onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>
      </div>
      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {/* <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select> */}
      </div>

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Client Name</th>
              {/* <th>Package</th> */}
              {/* <th>Date</th> */}
              <th>Contact</th>
              <th>Address</th>
              {/* <th>Photographer</th> */}
              {/* <th>Status</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                {/* <td>₹{order.paymentDetails.amount}</td> */}
                {/* <td>{new Date(order.date).toLocaleDateString()}</td> */}
                <td>
                  <div className="contact-info">
                    <span>{order.email}</span>
                    <span>{order.phone}</span>
                  </div>
                </td>
                <td>{order.address}</td>
                {/* <td>
                  <select
                    value={order.photographerAssigned?._id || ''}
                    onChange={(e) => handlePhotographerAssign(order._id, e.target.value)}
                    className="photographer-select"
                  >
                    {!order.photographerAssigned && (
                      <option value="">Assign Photographer</option>
                    )}
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </td> */}

                {/* <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`status-select ${order.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td> */}
                <td>
                  <div className="action-buttons">
                    {/* <button className="view-btn">View Details</button> */}
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveOrder(order._id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cusomters;