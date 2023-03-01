import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar";
import { getProfileUsers } from "../../redux/actions/profileAction";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Follower from "./Follower";
import Following from "./Following";

const Info = () => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [showFollower,setShowFollower]=useState(false)
  const [showFollowing,setShowFollowing]=useState(false)

  console.log(auth.user);
  console.log(id === auth.user._id);

  useEffect(() => {
    if (id === auth.user._id) {
      console.log("userData");
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth.user, dispatch, profile.users]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="supper-avatar" />
          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.userName}</h2>
              {auth.user._id === id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>
            <div className="follow_btn">
              <span className="mr-4" onClick={()=>setShowFollower(true)}>{user.followers.length} Followers</span>
              <span className="ml-4" onClick={()=>setShowFollowing(true)}>{user.following.length} Following</span>
            </div>
            <h6>
              {user.fullName}
              <span className="text-danger "> {user.mobile}</span> 
            </h6>
            <p className="mb-0">{user.address}</p>
            <h6>{user.email}</h6>
            <a href={user.website} target="_blank" rel="  noreferrer">
              {" "}
              {user.website}{" "}
            </a>
            <p>{user.story}</p>
          </div>
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}
          {showFollower && <Follower  users={user.followers} setShowFollower={setShowFollower}/>}
          {showFollowing && <Following  users={user.following} setShowFollowing={setShowFollowing}/>}
        </div>
      ))}
    </div>
  );
};

export default Info;
