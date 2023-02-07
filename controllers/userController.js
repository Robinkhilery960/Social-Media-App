const Users=require("../models/user.schema.js")

const userCtrl={
    searchUser:async(req,res)=>{
        try{
            
            console.log(req.query.userName)
            const users=await Users.find({userName:{$regex:req.query.userName}}).limit(10).select("fullName userName avatar")
                console.log(users) 
            res.json({users})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    getUser:async(req,res)=>{
        try{
            const user=await Users.findById(req.params.id).select("-password")
            if(!user)  return res.status(400).json({msg:" User does not exist "})
            res.json({user})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }

}


module.exports=userCtrl