import React, { useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom'
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"
import axios from "axios"

const Followers = () => {
    const history = useHistory()
    redirectIfNotAuth(history)

    const [followerList, setFollowerList]= useState([])
    useEffect(()=>{
        axios.get("/api/user/getFollowedUsers",{
            withCredentials: true, credentials:"include"
          }).then((response)=>setFollowerList(response.data.followedUserObjects)
          )
    },[])

    
  return (
    <div>
        <h1>Followers</h1>
        {followerList.length === 0 ? <div>You have no followers right now. :( </div> : (
            followerList.map(follower => (
                <div key={follower._id} style={{display:"flex"}}>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}} src={follower.profile_img} />
                    <h2>{follower.username}</h2> 
                </div>
            ))
        )}
    </div>
  )
}

export default Followers