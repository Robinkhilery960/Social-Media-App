import React from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts' 
import "../../styles/profile.css"
import LoadIcon from "../../images/loading.gif"
import { useSelector } from 'react-redux'

function Profile() { 
  const {profile}=useSelector(state=>state)
  return ( 
    <div> 
      {
        profile.loading? <img  className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />:
        <Info/>
      }
        <Posts/>
        </div>
  )
}

export default Profile