const Users=require("../models/user.schema.js")
const jwt=require("jsonwebtoken")


const auth=async(req,res,next)=>{
try{
// grab the token 
const token=req.header("Authentication")   

console.log("auth is  called")
console.log(token)
if(!token) return res.status(400).json({msg:"Invalid Authentication"})

const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

if(!decoded) return res.status(400).json({msg:"Invalid Authentication"})

const user=await Users.findOne({_id:decoded.id})

console.log(user) 
req.user=user
next()
}catch(err){
  return res.status(500).json({msg:err.message})
}
}

module.exports=auth