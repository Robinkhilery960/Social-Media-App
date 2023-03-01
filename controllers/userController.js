const mongoose = require("mongoose");
const Users = require("../models/user.schema.js");
const formidable = require("formidable");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const userCtrl = {
  searchUser: async (req, res) => {
    try {
      console.log(req.query.userName);
      const users = await Users.find({
        userName: { $regex: req.query.userName },
      })
        .limit(10)
        .select("fullName userName avatar");
      console.log(users);
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select("-password")
      .populate("followers following", "-password");
      if (!user) return res.status(400).json({ msg: " User does not exist " });
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { avatar, fullName, mobile, address, story, website, gender } = req.body
      if(!fullName) return res.status(400).json({msg: "Please add your full Name."})

      await Users.findOneAndUpdate({_id: req.user._id}, {
          avatar, fullName, mobile, address, story, website, gender
      })

      res.json({msg: "Update Success!"})

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
  },

  follow: async (req,res) => {
    try {
      // check for already followed or not 
      const user=await Users.find({_id:req.params.id,followers:req.user._id})

      if(user.length>0) return res.status(500).json({msg:"you are already following this user"})

      // if not followed then follow the user 
      await Users.findOneAndUpdate({_id:req.params.id},{$push:{followers:req.user._id}},{new:true})
      // also update the following 
      await Users.findOneAndUpdate({_id:req.user._id},{$push:{following:req.params.id}},{new:true})

      res.json({msg:"Followed user "})
      
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },

  unFollow: async (req,res) => {
    try {  

      // if not followed then follow the user 
      await Users.findOneAndUpdate({_id:req.params.id},{$pull:{followers:req.user._id}},{new:true})
      // also update the following 
      await Users.findOneAndUpdate({_id:req.user._id},{$pull:{following:req.params.id}},{new:true})

      res.json({msg:"user unfollowed"})
      
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  },
};

module.exports = userCtrl;
