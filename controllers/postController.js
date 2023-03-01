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
};

module.exports = postController;
