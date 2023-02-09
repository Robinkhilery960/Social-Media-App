 export const checkImage=(file)=>{
    let err=""
    if(!file) return err="File does not exist "
    if(file.size>1024*1024) err="The largest image size is 1 mb"
    if(file.type !== "image/jpeg" && file.type !=="image/jpg" && file.type !=="image/png") err="Image format is incorrect"

    return err
 }

 export const getFormData=(userData,images)=>{
    const formData=new FormData()

    formData.append("file",images)
     console.log(userData ) 
    for(const key in userData){ 
      console.log(userData[key])
      if(key!=="followers" || key!=="following")
       formData.append(key,userData[key])
    }  
    return formData
 }