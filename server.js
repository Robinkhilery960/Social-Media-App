require("dotenv").config()
require("./config/database").connect()
const express=require("express") 
const cookieParser=require("cookie-parser")
const cors=require("cors")
const cloudinary = require('cloudinary').v2


const app=express()

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  }); 

app.use(express.json())
app.use(cors())
app.use(cookieParser())


// routes 

app.use("/api",require("./routes/authRouter.js"))
app.use("/api",require("./routes/userRouter.js"))
app.use("/api",require("./routes/postRouter.js"))

app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log("Server is listening at PORT 5000")
})