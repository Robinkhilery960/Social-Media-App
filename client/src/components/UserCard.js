import React, { useEffect,useState } from "react";
import Avatar from "./Avatar";
import { Link  } from "react-router-dom";



function UserCard({ user, border, handleClose }) {


 
    const handleCloseAll=()=>{
      if(handleClose) handleClose()
    }


  return (
    <div className={`d-flex p-2 align-item-center ${border}`}>
      <div>
        <Link to={`/profile/${user._id}`} onClick={handleCloseAll} className="d-flex  align-item-center">
        <Avatar src={user.avatar} size="bg-avatar" />
        <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
          <span className="d-block">{user.userName}</span>
          <small style={{ opacity: 0.7 }}>{user.fullName}</small>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
