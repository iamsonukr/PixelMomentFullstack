import express from 'express'
const employeeRouter=express.Router()

import { createEmployee,updateEmployee,removeEmployee,getAllEmployees,getSinpleEmp } from '../controler/employee.controller.js'
import { adminAccess } from '../middleware/authAdmin.middleware.js'

// employeeRouter.get('/all-employees',adminAccess,getAllEmployees)
// employeeRouter.get('/single-employees/:id',adminAccess,getSinpleEmp)
// employeeRouter.post('/create-employee',adminAccess,createEmployee)
// employeeRouter.put('/update-employee/:id',adminAccess,updateEmployee)
// employeeRouter.delete('/remove-employee/:id',adminAccess,removeEmployee)

employeeRouter.get('/all-employees',getAllEmployees)
employeeRouter.get('/single-employees/:id',getSinpleEmp)
employeeRouter.post('/create-employee',createEmployee)
employeeRouter.post('/update-employee/:id',updateEmployee)
employeeRouter.delete('/remove-employee/:id',removeEmployee)




export default employeeRouter