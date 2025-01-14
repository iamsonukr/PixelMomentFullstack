// src/components/Dashboard/EmployeeDashboard.jsx
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { CentralGovContext } from '../../context/CentralGovContext';
import './EmployeeDashboard.scss';
import { EmployeeContext } from '../../context/EmployeeContext';
import {toast} from 'react-toastify'
import {Navigate} from 'react-router-dom'

const EmployeeDashboard = () => {
  const { token, url,adminToken } = useContext(CentralGovContext);
  const { allEmployee } = useContext(EmployeeContext)
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    skills: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  useEffect(() => {
    if (allEmployee) {
      console.log("Employees data fetched: ", allEmployee);
      setEmployees(allEmployee);  // Update local state with allEmployees from context
    }
  }, [allEmployee]);  // Will run every time allEmployees changes

  // if (!allEmployee && adminToken) {
  //   // Display loading or some message until data is fetched
  //   return <div>Loading employees...</div>;
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? Number(value) : value,
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      let endPoint='';
      if(editingEmployeeId){
        endPoint=`${url}/api/admin/employee/update-employee/${editingEmployeeId}`
      }else{
        endPoint=`${url}/api/admin/employee/create-employee/`
      }
      console.log("THis is the endpoint," ,endPoint)
      const response=await axios.post(endPoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if(editingEmployeeId){
        toast.success("Employee data updated successfully")
      }else{
        toast.success("Employee created successfully")
      }
      setShowForm(false)
    } catch (error) {
      console.log(error)
    }
  };

  const handleEdit = async(id) => {
    try {
      
      const response=await axios.get(`${url}/api/admin/employee/single-employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      setFormData(response.data.data);
      setEditingEmployeeId(id);
      setShowForm(true);
      console.log(response)
    } catch (error) {
        console.log(error)
    }
  };

  const handleDelete = (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this employee?')) {
        const res=axios.post(`${url}/api/admin/employee/remove-employee/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          console.log(res.data)
          toast.success("Employee deleted successfully")
          
      }
      
    } catch (error) {
      console.log(error)
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      skills: []
    });
    setSkillInput('');
    setEditingEmployeeId(null);
    setShowForm(false);
  };

  const filteredEmployees = employees.filter(emp =>
    // const filteredEmployees = employees.map(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if(!adminToken){
    return <Navigate to="/" />
  }

  return (
    <div className="employee-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Employee Management</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          Add New Employee
        </button>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Add/Edit Employee Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingEmployeeId ? 'Edit Employee' : 'Add New Employee'}</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Date of Birth Field */}
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Address Field */}
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Skills Section */}
              <div className="form-group">
                <label htmlFor="skills">Skills:</label>
                <div className="skills-input">
                  <input
                    type="text"
                    id="skills"
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />
                  <button type="button" onClick={handleAddSkill}>
                    Add Skill
                  </button>
                </div>
                <ul className="skills-list">
                  {formData.skills.map((skill, index) => (
                    <li key={index}>
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit">
                  {editingEmployeeId ? 'Update Employee' : 'Save Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Employees Table */}
      <div className="table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.address}</td>
                <td>
                  <div className="skills-display">
                    {employee.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
