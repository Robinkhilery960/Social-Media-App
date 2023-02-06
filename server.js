require("dotenv").config()
require("./config/database").connect()
const express=require("express") 
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())


// routes 

app.use("/api",require("./routes/authRouter.js"))
app.use("/api",require("./routes/userRouter.js"))

app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log("Server is listening at PORT 5000")
})