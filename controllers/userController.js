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
      const user = await Users.findById(req.params.id).select("-password");
      if (!user) return res.status(400).json({ msg: " User does not exist " });
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    // console.log(req)
    // create an instance of the form using formidable
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });
    //  console.log(form)
    // now parse the request stream
    form.parse(req, async function (error, fields, files) {
      console.log("fields", fields);
      console.log("files", files);

      const {fullName, mobile, website, address, story, gender, avatar }=fields

      try {
        if (error) {
          console.log(error.message);
          return res.status(400).json({
            msg: error.message,
          });
        }

        if (!fields.fullName)
          return res.status(400).json({ msg: "Please add your Full Name" });

        let result;
        if (files.file) {
          result = await cloudinary.uploader.upload(files.file.filepath, {
            folder: "avatars",
          });
        }

            console.log(undefined===false) 
        const user = await Users.findByIdAndUpdate(
          req.user._id,
          {  fullName, mobile, address,website, story, gender , avatar: result ? result.secure_url :avatar },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(user)
        return res.status(200).json({ msg: " User Profile Updated  successfully!!", user });
      } catch (error) {
        return res.status(500).json({
          msg: error.message,
        });
      }
    });
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
