import React from 'react'
import Send from "../../../images/send.svg"
import {Link} from "react-router-dom"



const CardFooter = ({post}) => {
  return (
  <div className="card-footer">
    <div className='card_icon_menu'>
      <div>
        <i className='far fa-heart'/>
        <Link to={`/post/${post._id}`}>
          <i  className='far fa-comment'/> 
        </Link>
        <img src={Send} alt="send svg " />
      </div>
      <i className='far fa-bookmark'></i>
    </div>
    <div className="d-flex   justify-content-between">
      <h6 style={{padding:"0 25px" ,cursor:"pointer"}}>{post.likes.lenth} likes</h6>
      <h6 style={{padding:"0 25px" ,cursor:"pointer"}}>{post.comments.lenth} comments</h6>
    </div>
  </div>
  )
}

export default CardFooter