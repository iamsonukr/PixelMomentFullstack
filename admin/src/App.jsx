import React from 'react'
import Navbar from './components/Navbar/Navbar'
// import { Sidebar } from 'lucide-react'
import Sidebar from './components/Sidebar/Sidebar'
import OrdersDashboard from './components/Orders/OrdersDashboard'
import EmployeeDashboard from './components/Employee/EmployeeDashboard'
import { Routes,Route } from 'react-router-dom'
import './App.scss'

// import { Route } from 'lucide-react'

const App = () => {
  return (
    <div className='main-page'>
      <div className="main-navbar">
        <Navbar />
      </div>
      <div className="dashboard-sidebar" style={{display:'flex'}}> 
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="dashboard">
          <Routes>
            <Route path="/" element={<OrdersDashboard />} />
            <Route path="/employee" element={<EmployeeDashboard />} />
            {/* <Route path="/manage-emp/:id?" element={<CreateEmp />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App