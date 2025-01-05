import { Children, useState } from "react";
import { useContext,useEffect } from "react";
import { createContext } from "react";
import axios from 'axios'

export const EmployeeContext=createContext(null)

const EmployeeContextProvider=(prop)=>{
    const [allEmployee,setAllEmployee]=useState(null)

      // Fetch employees on mount
  const getEmployees=async()=>{
    try {
      const result=await axios.get(`http://localhost:5002/api/admin/employee/all-employees`)
      console.log(result.data.data )
      setAllEmployee(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getEmployees()

  },[])
  useEffect(() => {
    if(allEmployee){
      console.log(allEmployee)
    }
  }, [allEmployee]);

    const employeeData={
      allEmployee,
        getEmployees,

    }


    return (
        <EmployeeContext.Provider value={employeeData}>
          {prop.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider;