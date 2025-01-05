import axios from 'axios';

export const getAllEmployees = async (token) => {
  try {
    const response = await axios.get('/api/admin/employee/all-employees', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || 'Error fetching employees';
  }
};

export const createEmployee = async (token, employeeData) => {
  try {
    const response = await axios.post(
      '/api/admin/employee/create-employee',
      employeeData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || 'Error creating employee';
  }
};

export const updateEmployee = async (token, id, employeeData) => {
  try {
    const response = await axios.put(
      `/api/admin/employee/update-employee/${id}`,
      employeeData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || 'Error updating employee';
  }
};

export const getSingleEmployee = async (token, id) => {
  try {
    const response = await axios.get(
      `/api/admin/employee/single-employees/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || 'Error fetching employee details';
  }
};

export const removeEmployee = async (token, id) => {
  try {
    const response = await axios.delete(
      `/api/admin/employee/remove-employee/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || 'Error removing employee';
  }
};
