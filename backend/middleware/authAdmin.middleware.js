import jwt from 'jsonwebtoken'


// Unhealthy way of dealing with token

// axios.post('https://your-api-endpoint.com/protected-route',{headers: { token: 'sdfsdfsdfsdfsdf'}},{user} )
   
    

const adminAccess =async(req,res,next)=>{
    const token=req.headers.token
    if(!token){
        return res.status(401).send({success:false,message:"You are not authorised"})
    }
    try {
        const userId=jwt.verify(token,process.env.TOKEN_KEY)
        console.log(userId.id)
        req.body.userID=userId.id
        return next()
    } catch (error) {
        console.log(error)
        return res.status(401).send({success:false,message:"Token is expired"})
    }
}
export {adminAccess}


// Healthy way of dealing with token