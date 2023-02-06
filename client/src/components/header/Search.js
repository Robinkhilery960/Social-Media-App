import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataApi } from "../../utils/fetchData";
import UserCard from "../UserCard";


function Search() {
    const [search,setSearch]=useState("")
    const [users,setUsers]=useState([])

    const {auth}=useSelector(state=>state)
    const dispatch=useDispatch()

    const handleClose=()=>{
        setSearch("")
        setUsers([])
    }


    useEffect(()=>{
        if(search  ){
            getDataApi( `search?userName=${search}`,auth.token)
            .then(res=>setUsers(res.data.users))
            .catch(err=>dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.message}}))
        }else{
            setUsers([])
        }
    },[users,auth.token,dispatch])
  return (
    <form className="search_form">
      <input
        type="text"
        name="search"
        id="search"
        onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g,""))}
      />
      <div className="search_icon" style={{opacity:search?0:0.3
    }}>
        <span className="material-icons">search</span>
        <span>search</span>
      </div>
      <div className="close_search"
      onClick={handleClose}
       style={{opacity:users.length===0?0:0.1}} >&times;</div>

      <div className="users">
        {
           search && users.map(user=>(
                <Link key={user._id} to={`/profile/${user._id}`} onClick={handleClose}>
                    <UserCard user={user}  border="border" />
                </Link>
            ))
        }
      </div>
    </form>
  );
}

export default Search;
