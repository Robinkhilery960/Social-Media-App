const Users = require("../models/user.schema.js");

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
      return res.status(400).json({ msg: "This user name already exists." });

    // check password length
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters." });


        // create a user 
    const newUser = await Users.create({
      fullName,
      userName,
      email,
      password,
      gender,
    });

    // access token 
    const access_token=newUser.createAccessToken()

    // refresh token 
    const refresh_token=newUser.createRefreshToken()

    // set cookie
    res.cookie("refreshToken", refresh_token,{
        httpOnly:true,
        path: '/api/refresh_token',
        maxAge: 30*24*60*60*1000 // 30days
    })

    // send response

    res.status(200).json({
        msg:"Registration completed successfully  ",
        access_token,
        newUser
        
    })
    } catch (error) {
         return res.status(500).json({msg: err.message})
    }
  
  },
  login:async (req,res)=>{
    try { 

    } catch (error) {
        
    }
  },
  logout:async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
  },
  generateAccessToken:async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
  }
  
  
};
