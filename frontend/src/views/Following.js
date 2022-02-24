import React from 'react'
import { useHistory } from 'react-router-dom'
import redirectIfNotAuth from '../utils/redirectionIfNotAuth'

const Following = () => {
    const history = useHistory()
    redirectIfNotAuth(history)

    const [followingList, setFollowingList]= useState[[]] 
    useEffect(()=>{
        axios.get("/api/user/getFollowingUser",{
            withCredentials: true, credentials:"include"
          }).then((response)=>
            setFollowingList(response.data.users_following)
          )
    },[])

  return (
    <div>
        <h1>Following</h1>
        {
            followingList.map(following => (
                <div style={{display:"flex"}}>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}} src={follower.profilePic} />
                    <h2>{following.username}</h2> 
                </div>
            ))
        }
    </div>
  )
}

export default Following