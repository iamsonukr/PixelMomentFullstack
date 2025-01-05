import React from 'react'
import Navbar from './components/Navbar/Navbar'
// import { Sidebar } from 'lucide-react'
import Sidebar from './components/Sidebar/Sidebar'
import OrdersDashboard from './components/Orders/OrdersDashboard'
import EmployeeDashboard from './components/Employee/EmployeeDashboard'
import { Routes,Route } from 'react-router-dom'
import './App.scss'
import Footer from './components/Footer/Footer'
import { useContext } from 'react'
import { EmployeeContext } from './context/EmployeeContext'
import { useEffect ,useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import LoginPage from './components/LoginPage/LoginPage'


const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);


 

  return (
    <div className='main-page'>
      <ToastContainer/>
      <div className="main-navbar">
        <Navbar />
      </div>
      <div className="dashboard-sidebar" style={{display:'flex'}}> 
        <div className="sidebar" style={{ width: isCollapsed ? "80px" :"300px" }}
        >
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
        </div>
        <div className="dashboard">
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}

            <Route path="/" element={<LoginPage />} />
            <Route path="/bookings" element={<OrdersDashboard />} />
            <Route path="/employee" element={<EmployeeDashboard />} />
            {/* <Route path="/manage-emp/:id?" element={<CreateEmp />} /> */}
          </Routes>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  )
}

export default App