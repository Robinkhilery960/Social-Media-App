import React, { useState } from "react";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useSelector, useDispatch } from "react-redux";
import "../styles/statusModal.css";
import { createPost } from "../redux/actions/postAction";

const StatusModal = () => {
  const [content, setContent] = useState("");
  const [images,setImages]=useState([])
  const [stream, setStream]=useState(false)
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();


  const handleChangeImages=(e)=>{
    console.log(e.target.files)
    const files=[...e.target.files]
    let err=""
    let newImages=[]

    files.forEach((file)=>{
        // if file is not found
        if(!file) return err="File does not exist"
        // if file type is incorrect 
        if(file.type!=="image/jpeg" && file.type!=="image/jpg" && file.type!=="image/png"){
          return err="File formate is incorrect"
        }
        return newImages.push(file) 
    })

    // if err found
    if(err)   dispatch({type:GLOBALTYPES.ALERT,payload:{error:err}})

    setImages([...images,...newImages])
    // console.log(images)
    // console.log(newImages)
  }

  const deleteImages=(index)=>{
    // console.log(index)
    const newArr=[...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }


  const handleSubmit=(e)=>{
    e.preventDefault()
    if(images.length===0) return dispatch({type:GLOBALTYPES.ALERT, payload:{error:"Please add Images"}})
    dispatch(createPost({content, images, auth}))
    setContent("")
    setImages([])
    
  }

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit} >
        <div className="status_header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <textarea
            name="content"
            placeholder={`${auth.user.fullName},What are you thinking ?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="show_images">
            {
              images.map((image, index)=>(
                <div key={index} id="file_img">
                  <img src={URL.createObjectURL(image)} alt="images" className="img_thumbnail" style={{filter:theme?"invert(1)":"invert(0)"}}/>
                  <span onClick={()=>deleteImages(index)}>&times;</span>
                </div>
              ))
            }
          </div>
          <div className="input_images">
            {/* TODO:Capture image from   video  */}
            <i className="fas fa-camera" onClick={()=>setStream(true)} />
            <div className="file_upload">
              <i className="fas fa-image"></i>
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="images/*"
                onChange={(e)=>handleChangeImages(e)}
              />
            </div>
          </div>
        </div>
        <div className="status_footer my-1">
          <button type="submit" className="btn btn-secondary w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
