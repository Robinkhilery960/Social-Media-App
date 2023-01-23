const Users = require("../models/user.schema.js");
const jwt=require("jsonwebtoken")

const authControllers = {
  register: async (req, res) => {
    try {
        
          // get data from the  client
    const { fullName, userName, email, password, gender } = req.body;

    // validate that data
    if (!(fullName || userName || email || password || gender)) {
      return res
        .status(400)
        .json({ msg: "Please provide all the required data" });
    }

    const newUserName = userName.toLowerCase().replace(/ /g, "");

    // check userName already exist or not
    const user_name = await Users.findOne({ userName: newUserName });
    if (user_name)
      return res.status(400).json({ msg: "This user name already exists." });

    // check if email exist  or not
    const user_email = await Users.findOne({ email });
    if (user_email)
      return res.status(400).json({ msg: "This email already exists." });

    // check password length
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters." });


        // create a user 
    const newUser = await Users.create({
      fullName,
      userName:newUserName,
      email,
      password,
      gender,
    });

    // access token 
    const access_token=await newUser.createAccessToken()

    // refresh token 
    const refresh_token= await newUser.createRefreshToken()

    // set cookie
    res.cookie("refreshToken", refresh_token,{
        httpOnly:true,
        path: '/api/refresh_token',
        maxAge: 30*24*60*60*1000 // 30days
    })

    // send response
    newUser.password=""

    res.status(200).json({
        msg:"Registration completed successfully  ",
        access_token,
        newUser
        
    })
    } catch (error) {
          console.log("error in  register  controller  ")
         return res.status(500).json({msg: err.message})
    }
  
  },
  login:async (req,res)=>{
    try { 
      // collect data from the client 
      const {email,password}=req.body
      // validate that does 
      if(!(email || password)) res.status(400).json({msg:"Email and password are required"})
      // check   does user exist 
      const user=await Users.findOne({email}).populate("followers following", "avatar userName fullName followers following")
      if(!user) res.status(400).json({msg:"User does not exist. Please Register"})

       const isPasswordMatched=await user.comparePassword(password)
       if(!isPasswordMatched) res.status(400).json({msg:"Invalid credentials-pass"})

       // access token 
    const access_token=await user.createAccessToken()

    // refresh token 
    const refresh_token= await user.createRefreshToken()

    // set cookie
    res.cookie("refreshToken", refresh_token,{
        httpOnly:true,
        path: '/api/refresh_token',
        maxAge: 30*24*60*60*1000 // 30days
    })

    // send response
    user.password=""
    res.status(200).json({
        msg:"Login completed successfully  ",
        access_token,
        user
        
    })

    } catch (error) {
        return res.status(500).json({msg:error.msg})
    }
  },
  logout:async (req,res)=>{
    try {
        res.clearCookie("refreshToken",{
          path:"/api/refresh_token"
        })
        res.status(200).json({msg:"Logout successfully completed"})
    } catch (error) {
        return res.status(500).json({msg:"Logout failed"})
    }
  },
  generateAccessToken:async (req,res)=>{
    try {
      // get refresh token from cookies 
        const refresh_token=req.cookies.refreshToken
        if(!refresh_token) return res.status(400).json({msg:"Please login"})
        // 
        const result=jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET)
        if(!result) return res.status(400).json({msg:"Refresh Token is not valid"})

        const user= await Users.findById(result.id).select("-password").populate("followers following", "avatar userName fullName followers following")

        if(!user) return res.status(400).json({msg:"User does not exist "})

        // create access token 
        const access_token = await user.createAccessToken()

        if(!access_token) return res.status(400).json({msg:" Access token not created "})

        // send the response 
        res.status(200).json({msg:"access token created successfully", user} )
    } catch (error) {
        console.log("Error in generateAccessToken controller ")
        return res.status(400).json({msg:error.msg})
    }
  } 

  /* 
  TODO: More Controller to work upon 
  1. Forget password
  2. Reset password
  3. Change password
  4. get Profile 
  */ 
};


module.exports=authControllers