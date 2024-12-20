

const checkAdmin=async(req,res,next)=>{
    const adminEmail=process.env.ADMIN_EMAIL;
    const adminPassword=process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        return res.status(500).send({
            success: false,
            message: "Server configuration error: Admin credentials not set."
        });
    }

    try {
        if(req.body.email===adminEmail && req.body.password===adminPassword){
            return next()
        }
        return res.status(401).send({success:false,message:"You are not authorised"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:"Internal Server error"})
    }
}

export {checkAdmin}