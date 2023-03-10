import  axios from "axios"

export const getDataApi=async(url,token)=>{
    try {
        const res=await axios.get(`/api/${url}`,{
           headers:{Authentication:token}
        })
        return res  
    } catch (error) {
        console.log("error in getDataApi")
        console.log(error.msg)
    }
}

export const postDataApi=async(url,post,token)=>{
    console.log("post api is called ",url,post,token )
    
    try {
        const res=await axios.post(`/api/${url}`,post,{
           headers:{Authentication:token}
        }) 
        return res   
    } catch (error) {
        console.log("error in post DataApi")
        console.log(error.message)   
    }
}

export const putDataApi=async(url,post,token)=>{
    console.log("post api is called ")
    try {
        const res=await axios.put(`/api/${url}`,post,{
           headers:{Authentication:token}
        })
        return res  
    } catch (error) {
        console.log("error in putDataApi")
        console.log(error.msg)
    }
}

export const patchDataApi=async(url,post,token)=>{
    
    try {
        const res=await axios.patch(`/api/${url}`,post,{
           headers:{Authentication:token}
        })
        return res  
    } catch (error) {
        console.log("error in patchDataApi")
        console.log(error.msg)
    }
}

export const deleteDataApi=async(url,token)=>{
    try {
        const res=await axios.delete(`/api/${url}`,{
           headers:{Authentication:token}
        })
        return res  
    } catch (error) {
        console.log("error in deleteDataApi")
        console.log(error.msg)
    }
}