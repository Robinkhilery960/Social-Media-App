const express=require("express") 
const postController = require("../controllers/postController")
const auth=require("../middleware/auth")




const router=express.Router()

 router.post("/posts",auth, postController.createPost)
 router.get("/posts",auth, postController.getPosts)
 router.post("/post/:id", auth, postController.updatePosts)
 router.post("/post/:id/like", auth, postController.likePost)
 router.post("/post/:id/unlike", auth, postController.UnlikePost)

module.exports=router