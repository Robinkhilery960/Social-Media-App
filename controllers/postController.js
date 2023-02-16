const Posts=require("../models/post.schema")

const postController={
createPost:async(req, res)=>{
    try {
        const {content, images}= req.body
        const newPost=await  Posts.create({
            content, images
        })

        res.json({
            msg:"Post created successfully",
            newPost 
        })

    } catch (error) {
        return res.status(500).json({
            msg:error.message
        })
    }
}
}

module.exports=postController