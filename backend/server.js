import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { orderRouter } from './routes/order.routes.js';
import employeeRouter from './routes/adminEmployee.routes.js';
import connectDB from './config/connectDB.js';
import {adminAccessRouter} from './routes/adminAccess.routes.js';


const PORT=5002;
const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())
 
app.get('/as',(req,res)=>{
    res.send("<h1>PixelMoment is ON</h1>")   
})


// api to place order
app.use('/api/order',orderRouter)
app.use('/api/admin/employee',employeeRouter)
app.use('/api/admin/access',adminAccessRouter)


//api to validate order

connectDB()
app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
})