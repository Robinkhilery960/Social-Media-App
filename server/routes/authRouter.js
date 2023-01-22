const express=require("express")
const authControllers=require("../controllers/authController.js")




const router=express.Router()


router.post("/register",authControllers.register())

router.post("/login",authControllers.login())

router.post("/logout")

router.post("/refresh_token")

module.exports=router