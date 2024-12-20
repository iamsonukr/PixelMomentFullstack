import AdminModel from "../models/admin.model.js";
import bcrypt, { genSalt } from 'bcrypt'


const adminSignUp=async(req,res)=>{
    try {
        const {name,email,password}=req.body;

        const exist=await AdminModel.findOne({email})
        if(exist){
            return res.status(400).send({message:"user alreary exist"})
        }
        
        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        const newAdmin=new AdminModel({
            name,email,password:hashedPassword
        })
        await newAdmin.save()
        return res.status(200).send({success:true,message:"Admin Created Successfully"})
    } catch (error) {
        return res.status(400).send({success:false,message:error.message})
    }
}

const adminLogin=async(req,res)=>{
    const  {email ,password}=req.body   

    try {
        const admin= await AdminModel.findOne({email})
        if(!admin){
            return res.status(400).send({success:false,message:"Invalid Email or Password"})
        }
        const validPassword=await bcrypt.compare(password,admin.password)
        if(!validPassword){
            return res.status(400).send({success:false,message:"Invalid Credentials"})
        }

        return res.status(200).send({success:true,message:`Welcome back ${admin.name}`})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}



export {adminLogin,adminSignUp}