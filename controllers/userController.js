const Users=require("../models/user.schema.js")

const userCtrl={
    searchUser:async(req,res)=>{
        try{
            const users=await Users.find({userName:{regex:req.query.userName}}).limit(10).select("fullName userName avatar")

            res.json({users})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}


module.exports=userCtrl