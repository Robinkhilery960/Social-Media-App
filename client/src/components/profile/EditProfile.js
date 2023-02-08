import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import {GLOBALTYPES} from "../../redux/actions/globalTypes"
import { updateProfileUser } from "../../redux/actions/profileAction";


const EditProfile = ({  setOnEdit }) => {
  const initialState = {
    fullName: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullName, mobile, address, website, story, gender } = userData;
  const dispatch=useDispatch()
  const [avatar, setAvatar] = useState("");
  const { auth, theme } = useSelector((state) => state);

  const changeAvatar = (e) => {
    const file=e.target.files[0]
    // console.log(file)
    // checkImage type and size 
    const err=checkImage(file)
    if(err) return dispatch({type:GLOBALTYPES.ALERT,payload:{error:err}})
    setAvatar(file)
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(updateProfileUser({userData,avatar,auth}))
  }



  useEffect(()=>{
    setUserData(auth.user)
  },[auth.user])

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>

      <form onSubmit={handleSubmit} enctype="multipart/form-data" >
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? `invert(1)` : `invert(0)` }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar} 
              multiple
            />
          </span>
        </div>
        <div className="form_group">
          <label htmlFor="fullName">Full Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute "
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {fullName.length}/25
            </small>
          </div>
        </div>
        <div className="form_group">
          <label htmlFor="mobile">Mobile</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form_group">
          <label htmlFor="address">Address</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form_group">
          <label htmlFor="website">Website</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="website"
              name="website"
              value={website}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form_group">
          <label htmlFor="story">Story</label>
          <div className="position-relative">
            <textarea
              type="text"
              className="form-control"
              id="story"
              name="story"
              value={story}
              onChange={handleInput}
              cols="30"
              rows="4"
            />
            <small
              className="text-danger d-block text-right position-absolute"
              style={{ bottom: "2%", right: "2%" }}
            >
              {story.length}/200
            </small>
          </div>
        </div>
        <label htmlFor="gender" >Gender</label>
        <div className="input-group-prepend px-0 mb-4  ">
          <select name="gender" id="gender" className="custom-select text-capitalize" onChange={handleInput}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-info w-100 ">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
