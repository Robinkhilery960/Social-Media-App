const mongoose =require("mongoose")
 
const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        require:[true,"Name is required"],
        trim:true,
        maxLength:[50,"Name should be less than 50 characters"]
    },
    userName:{
        type:String,
        require:[true,"user name  is required"],
        trim:true,
        maxLength:[50,"User name should be less than 50 characters"],
        unique:true
    },
    email:{
        type:String,
        require:[true,"email is required"],
        trim:true, 
        unique:true
    },
    password:{
        type:String,
        require:[true,"password is required"], 
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/dsaofytf2/image/upload/v1674409574/The%20Network/Avatar/avatar_kd5k80.png"
    },
    role:{
        type:String, 
        default:"user"
    },
    gender:{
        type:String,
        default:"male"
    },
    mobile:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    story:{
        type:String,
        default:'',
        maxLength:[200,"User name should be less than 200 characters"],
    },
    website:{
        type:String,
        default:""
    },
    followers:[
        {
            type:mongoose.Types.ObjectId,
             ref:"user"
        }
    ],
    following:[
        {
            type:mongoose.Types.ObjectId,
             ref:"user"
        }
    ],
    saved:[
        {
            type:mongoose.Types.ObjectId,
             ref:"user"
        }
    ]
 
},
{
    timestamps:true
}
)

module.exports=mongoose.model("user",userSchema)