const express=require("express")
const auth=require("../middleware/auth.js")
const userControllers=require("../controllers/userController.js")




const router=express.Router()


router.get("/search",auth,userControllers.searchUser)

router.post("/user",auth,userControllers.updateUser)

router.get("/user/:id",auth,userControllers.getUser)

router.patch("/user/:id/follow",auth,userControllers.follow)
 
router.patch("/user/:id/unfollow",auth,userControllers.unFollow)

module.exports=router