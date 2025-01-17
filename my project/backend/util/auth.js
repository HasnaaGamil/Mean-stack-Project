const jwt=require("jsonwebtoken");
const secretKey=`-^'taV4w?T[dvj?5vS}FqY&u&"5p^q[Nj+*pC:^"I/PdPQbvCH9w!c<J6"YE|eg`;
exports.accessToken=(data)=>{
    return jwt.sign(data,secretKey,{expiresIn:'24h'});
}
exports.authMw=(req,res,next)=>{
    try{
        const token=req.header("Authorization")?.replace("Bearer ","");
        if(token){
            const verifyToken=jwt.verify(token,secretKey);
            req.user=verifyToken;
            next();
        }
        else{
            res.status(401).json({
                status:"failed",
                message:"Missing token"
            })//unauthorized
        }
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
}