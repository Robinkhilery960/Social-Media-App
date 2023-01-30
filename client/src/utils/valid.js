const valid=({fullName, userName, email, password, cf_password})=>{
const err={}

if(!fullName){
    err.fullName="Please add your Full Name "
}else if(fullName.length>25){
    err.fullName="Full Name cannot exceed 25 character"
}


if(!userName){
    err.userName="Please give your User Name "
}else if(userName.replace(/ /g,"").length>25){
    err.userName="User Name cannot exceed 25 character"
}


if(!email){
    err.email="Please enter an  email id "
}else if(email.length>25){
    err.email=" Email cannot exceed 25 character"
}


if(!validateEmail(email)){
    err.email="Email is Invalid"
} 


if(!password){
    err.password="Please enter your password"
}else if(password.length<6){
    err.password="Password length should be more than 6 character"
}


if(cf_password!==password){
    err.cf_password="Confirm password did not match "
}

return {
    errMsg:err,
    errLength:Object.keys(err).length
}

}


function validateEmail(mail)
{
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
}

export default valid