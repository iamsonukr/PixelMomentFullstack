import express from 'express'
const employeeRouter=express.Router()

import { createEmployee,updateEmployee,removeEmployee,getAllEmployees } from '../controler/employee.controller.js'
import { adminAccess } from '../middleware/authAdmin.middleware.js'

employeeRouter.get('/all-employees',adminAccess,getAllEmployees)
employeeRouter.post('/create-employee',adminAccess,createEmployee)
employeeRouter.put('/update-employee/:id',adminAccess,updateEmployee)
employeeRouter.delete('/remove-employee/:id',adminAccess,removeEmployee)



export default employeeRouter