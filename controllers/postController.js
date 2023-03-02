const Posts = require("../models/post.schema");
const formidable = require("formidable");

const postController = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;
      console.log(content, images);
      if (images.length === 0) {
        return res.status(400).json({ msg: "Please add  your images" });
      }

      const newPost = await Posts.create({
        content,
        images,
        user: req.user._id,
      });

      res.json({ msg: "Post created ", newPost });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  getPosts: async (req, res) => {
    try {
      // get all the posts from the user to whom user is following
      const posts = await Posts.find({
        user: [...req.user.following, req.user._id],
      }).sort('-createdAt')
      .populate("user likes", "avatar userName fullName"); 

      res.json({ msg: "posts found", result: posts.length, posts });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  updatePosts: async (req, res) => {
    try {
       const {content, images}= req.body
       const post=await Posts.findOneAndUpdate({_id:req.params.id},{content, images}).populate("user likes", "avatar userName fullName")
       res.json({msg:"Updated Posts", newPost:{...post, content, images}})
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  
  likePost: async (req, res) => {
    try {
      console.log("like post starting")
      const post=await Posts.find({_id:req.params.id, likes:req.user._id})
      console.log(post)
      if(post.length>0) return res.status(400).json({msg:"You alredy liked this post "})

       const newPost=await Posts.findOneAndUpdate({_id:req.params.id}, {$push:{likes:req.user._id}},{new:true})
       res.json({msg:"Post Liked",newPost})
    } catch (err) {
      return res.status(500).json({ error: err.response.data.msg });
    }
  },
  
  UnlikePost: async (req, res) => {
    try {  

       const newPost=await Posts.findOneAndUpdate({_id:req.params.id}, {$pull:{likes:req.user._id}},{new:true})
       if(!newPost) return res.status(400).json({msg:"This post does not exist"})
       res.json({msg:"Post unliked",newPost})
    } catch (err) {
      return res.status(500).json({ error: err.response.data.msg });
    }
  },

};

module.exports = postController;
