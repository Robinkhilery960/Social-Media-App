const express=require("express")
const authControllers=require("../controllers/authController.js")




const router=express.Router()


router.post("/register",authControllers.register)

router.post("/login",authControllers.login)

router.post("/logout",authControllers.logout)

router.post("/refresh_token",authControllers.generateAccessToken)

module.exports=router