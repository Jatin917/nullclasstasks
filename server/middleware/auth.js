import jwt from "jsonwebtoken"

const auth=(req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1];
        let decodedata=jwt.verify(token,process.env.JWT_SECRET)
        req.userid=decodedata?.id;
        // console.log(req.userid)
        next();
    } catch (error) {
        console.log(error)
    }
}
export default auth;