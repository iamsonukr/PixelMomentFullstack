import mongoose from 'mongoose'

const employeeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true,unique:true},
    dateOfBirth:{type:String},
    address:{type:String},
    skills:{type:Array,required:true}
})

const Employee=mongoose.model('Employee',employeeSchema)
export default Employee