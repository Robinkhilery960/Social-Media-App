require("dotenv").config()
const express=require("express") 
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log("Server is listening at PORT 5000")
})