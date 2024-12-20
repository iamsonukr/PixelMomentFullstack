import express from 'express'
import { adminLogin, adminSignUp } from '../controler/adminAccess.controller.js'


const adminAccessRouter=express.Router()

adminAccessRouter.post('/login',adminLogin)
adminAccessRouter.post('/signup',adminSignUp)
adminAccessRouter.get('/',async(req,res)=>{
    return res.status(200).json({message:'Admin Access Page'})
})


export {adminAccessRouter}