import React, { useState, useEffect} from 'react'
import Send from "../../../images/send.svg"
import {Link} from "react-router-dom"
import LikeButton from '../../LikeButton'
import {useSelector, useDispatch}  from "react-redux"
import {likePost} from "../../../redux/actions/postAction.js"
import {unLikePost} from "../../../redux/actions/postAction.js"

const CardFooter = ({post}) => {
  const [isLike, setIsLike]=useState(false)
  const [loadLike, setloadLike]=useState(false)
  const {auth}=useSelector(state=>state)
  const disptach=useDispatch()

  const handleLike=async()=>{
    if(loadLike) return;
    setIsLike(true)
    setloadLike(true)
    await disptach(likePost({post, auth}))
    setloadLike(false)
  }
  const handleUnlike=async()=>{
    if(loadLike) return;
    setIsLike(false)
    setloadLike(true)
    await disptach(unLikePost({post, auth}))
    setloadLike(false)

  }
  
  useEffect(()=>{
    if(post.likes.find(like=>like._id===auth.user._id)){
      setIsLike(true) 
    }
  },[post.likes,auth.user._id])

  return (
  <div className="card-footer">
    <div className='card_icon_menu'>
      <div>
        <LikeButton isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike}/>
        <Link to={`/post/${post._id}`}>
          <i  className='far fa-comment'/> 
        </Link>
        <img src={Send} alt="send svg " />
      </div>
      <i className='far fa-bookmark'></i>
    </div>
    <div className="d-flex   justify-content-between">
      <h6 style={{padding:"0 25px" ,cursor:"pointer"}}>{post.likes.length} likes</h6>
      <h6 style={{padding:"0 25px" ,cursor:"pointer"}}>{post.comments.length} comments</h6>
    </div>
  </div>
  )
}

export default CardFooter