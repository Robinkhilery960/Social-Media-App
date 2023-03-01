import React, { useEffect,useState } from "react";
import Avatar from "./Avatar";
import { Link  } from "react-router-dom";



function UserCard({ children, user, border, handleClose, setShowFollower, setShowFollowing }) {

  console.log(children)
 
    const handleCloseAll=()=>{
      if(handleClose) handleClose()
      if(setShowFollower) setShowFollower(false)
      if(setShowFollowing) setShowFollowing(false)
    }


  return (
    <div className={`d-flex p-2 align-items-center justify-content-between ${border}`}>
      <div>
        <Link to={`/profile/${user._id}`} onClick={handleCloseAll} className="d-flex  align-items-center">
        <Avatar src={user.avatar} size="bg-avatar" />
        <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
          <span className="d-block">{user.userName}</span>
          <small style={{ opacity: 0.7 }}>{user.fullName}</small>
        </div>
        </Link>
      </div>
      {
        children
      }
    </div>
  );
}

export default UserCard;
