export const GLOBALTYPES={
    AUTH: "AUTH",
    ALERT:"ALERT",
    THEME:"THEME",
    STATUS:"STATUS"
}


export const editData=(data,id,post)=>{
    const newData=data.map(item=>item._id===id?post:item)
    return newData
}


export const deleteData=(data,id)=>{
    const newData=data.filter(item=>item._id!==id)
    return newData
}