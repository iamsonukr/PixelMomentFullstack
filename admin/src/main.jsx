import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import CentralGovProvider from './context/CentralGovContext.jsx'
import EmployeeContextProvider from './context/EmployeeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <CentralGovProvider>
      <EmployeeContextProvider>

          <App />
      </EmployeeContextProvider>
        </CentralGovProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
