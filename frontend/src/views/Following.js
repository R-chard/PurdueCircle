import React,{useState,useEffect} from 'react'
import {useLocation,useHistory} from "react-router-dom"
import axios from "axios"

const Following = () => {

    const [followingList, setFollowingList]= useState(null)
    const location = useLocation()
    const history = useHistory()
    useEffect(()=>{
        axios.get("/api/user" + location.pathname,{
            withCredentials: true, credentials:"include"
          }).then((response)=>
            setFollowingList(response.data.followingUserObjects)
          )
    },[location.pathname])

  return (
    <div>
        <h1>Following</h1>
        {followingList != null && (followingList.length === 0 ? <div>You have no followers right now. :( </div> :
            followingList.map(following => (
                <div key={following._id} style={{display:"flex"}}>
                    <img 
                      style={{width:"160px", height:"160px", borderRadius:"80px"}} 
                      src={following.profile_img}
                      onClick={()=>{
                        history.push("/profile/"+ following.username)
                      }}
                    />
                    <h2>{following.username}</h2> 
                </div>
            ))
        )}
    </div>
  )
}

export default Following