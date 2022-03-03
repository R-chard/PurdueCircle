import React,{useState,useEffect} from 'react'
import axios from "axios"

const Following = () => {

    const [followingList, setFollowingList]= useState(null)
    useEffect(()=>{
        axios.get("/api/user/getFollowingUsers",{
            withCredentials: true, credentials:"include"
          }).then((response)=>
            setFollowingList(response.data.followingUserObjects)
          )
    },[])

  return (
    <div>
        <h1>Following</h1>
        {followingList != null && (followingList.length === 0 ? <div>You have no followers right now. :( </div> :
            followingList.map(following => (
                <div key={following._id} style={{display:"flex"}}>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}} src={following.profile_img} />
                    <h2>{following.username}</h2> 
                </div>
            ))
        )}
    </div>
  )
}

export default Following