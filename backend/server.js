import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { orderRouter } from './routes/order.routes.js';


const PORT=process.env.PORT;
const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())
 
app.get('/',(req,res)=>{
    res.send("Your payment gateway is ready")  
})

// api to place order
app.use('/api/order',orderRouter)


//api to validate order


app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
})