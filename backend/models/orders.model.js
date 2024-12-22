import mongoose, { Mongoose } from "mongoose"

const orderSchema=new mongoose.Schema({
    name:{
        name:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    package:{
        type:String,
        required:true
    },
    photographerAssigned:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
    }
})

const OrderModel=mongoose.model('Orders',orderSchema)

export default OrderModel