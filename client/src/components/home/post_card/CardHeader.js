import React from "react";
import Avatar from "../../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

const CardHeader = ({ post }) => {
  const { auth } = useSelector((state) => state);
console.log(post)
  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="bg-avatar" />

        <div className="card_name">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.userName}
            </Link>
          </h6>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      

      <div className="nav-item dropdown">
        <span
          className="  material-icons  cursor-pointer "
          id="moreLink"
           
          data-bs-toggle="dropdown"
          cursor-pointer
        >
            more_horiz
        </span>

        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item">
                <span className="material-icons">create</span> Edit Post
              </div>
              <div className="dropdown-item">
                <span className="material-icons">delete_outline</span> Remove
                Post
              </div>
            </>
          )}

          <div className="dropdown-item">
            <span className="material-icons">content_copy</span> Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
