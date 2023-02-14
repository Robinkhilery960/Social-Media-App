import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { follow,unFollow} from '../redux/actions/profileAction'
const FollowBtn = ({user}) => {

  const [followed,setFollowed]=useState(false)
  
  const {auth,profile}=useSelector(state=>state)
  const dispatch=useDispatch()


  const handleFollow=()=>{
    setFollowed(true)
    dispatch(follow({users:profile.users,user,auth}))
  }

  const handleUnFollow=()=>{
    setFollowed(false)
    dispatch(unFollow({users:profile.users,user,auth}))
  }

  useEffect(()=>{
    if(auth.user.following.find(item=>item._id===user._id)){ 
      setFollowed(true)
    }
  },[auth.user.following,user._id])
  
  return (
    <>
    {
      followed?<button className='btn btn-outline-danger ' onClick={handleUnFollow}>Unfollow</button>
      :<button className='btn btn-outline-info ' onClick={handleFollow}>Follow</button>
    }
    
    
    </>
  )
}

export default FollowBtn