import mongoose from 'mongoose'

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        .then(()=>{
            console.log("DB CONNECTED")
        })
    }
    catch(error){
        console.log(error)
        console.log('Error connecting database')
    }
}
export default connectDB
