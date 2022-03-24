import React, { useEffect,useState } from 'react'
import {useLocation,useHistory} from "react-router-dom"
import axios from "axios"

const Followers = () => {

    const [followerList, setFollowerList]= useState(null)
    const location = useLocation() 
    const history = useHistory()
    useEffect(()=>{
        axios.get("/api/user" + location.pathname,{
            withCredentials: true, credentials:"include"
          }).then((response)=>setFollowerList(response.data.followedUserObjects)
          )
    },[location.pathname])

    
  return (
    <div>
        <h1>Followers</h1>
        {followerList != null && (followerList.length === 0 ? <div>You have no followers right now. :( </div> : (
            followerList.map(follower => (
                <div key={follower._id} style={{display:"flex"}}>
                    <img 
                        style={{width:"160px", height:"160px", borderRadius:"80px"}} 
                        src={follower.profile_img}
                        onClick={()=>{
                            history.push("/profile/"+ follower.username)
                          }} 
                    />
                    <h2>{follower.username}</h2> 
                </div>
            ))
        ))}
    </div>
  )
}

export default Followers