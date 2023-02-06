const express=require("express")
const auth=require("../middleware/auth.js")
const userControllers=require("../controllers/userController.js")




const router=express.Router()


router.get("/search",auth,userControllers.searchUser)
 
module.exports=router