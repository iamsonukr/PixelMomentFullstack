import express from 'express'
import {checkAdmin} from '../middleware/isAdmin.middleware.js'

const employeeRouter=express.Router()

import { createEmployee,updateEmployee,removeEmployee,getAllEmployees } from '../controler/employee.controller.js'

employeeRouter.get('/all-employees',checkAdmin,getAllEmployees)
employeeRouter.post('/create-employee',createEmployee)
employeeRouter.put('/update-employee/:id',updateEmployee)
employeeRouter.delete('/remove-employee/:id',removeEmployee)



export default employeeRouter