export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File does not exist ");
  if (file.size > 1024 * 1024) err = "The largest image size is 1 mb";
  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/jpg" &&
    file.type !== "image/png"
  )
    err = "Image format is incorrect";

  return err;
};

 export const getFormData=(userData,images)=>{
    const formData=new FormData()
      console.log(images)

    for(const item of images){
      formData.append("file",item)
    }
     console.log(userData )
    for(const key in userData){
      console.log(userData[key])
      if(key!=="followers" || key!=="following")
       formData.append(key,userData[key])
    }
    return formData
 }

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    formData.append("file", item);

    formData.append("upload_preset", "ecvtt1mm");
    formData.append("cloud_name", "dsaofytf2");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsaofytf2/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
