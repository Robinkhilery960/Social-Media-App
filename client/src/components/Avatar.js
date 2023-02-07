import React from 'react'
import "../styles/avatar.css"
import { useSelector } from 'react-redux'

function Avatar({src,size}) {
    const {theme}=useSelector(state=>state)
  return (
   <img src={src} alt="avatar" className={size} style={{filter:`${theme?`invert(1)`:`invert(0)`}`}}/>
             
  )
}

export default Avatar