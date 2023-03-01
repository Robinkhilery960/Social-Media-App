const express=require("express") 
const postController = require("../controllers/postController")
const auth=require("../middleware/auth")




const router=express.Router()

 router.post("/posts",auth, postController.createPost)
 router.get("/posts",auth, postController.getPosts)
 router.post("/post/:id", auth, postController.updatePosts)

module.exports=router