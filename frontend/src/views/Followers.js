import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"

const Followers = () => {
    const history = useHistory()
    redirectIfNotAuth(history)

    const [followerList, setFollowerList]= useState[[]] 
    useEffect(()=>{
        axios.get("/api/user/getFollowedUsers",{
            withCredentials: true, credentials:"include"
          }).then((response)=>
            setFollowerList(response.data.users_followed)
          )
    },[])

    
  return (
    <div>
        <h1>Followers</h1>
        {
            followerList.map(follower => (
                <div style={{display:"flex"}}>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}} src={follower.profile_img} />
                    <h2>{follower.username}</h2> 
                </div>
            ))
        }
    </div>
  )
}

export default Followers