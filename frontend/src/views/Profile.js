import React,{useEffect,useState} from "react"
import {Link, useHistory} from "react-router-dom" 
import "../styles/Profile.css"
import axios from "axios"
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"

const Profile = (props) => {
    const history = useHistory()
    //redirectIfNotAuth(history)
    
    const [data, setData] = useState(null)
    useEffect(()=>{
        axios.get("http://localhost:3001/api/user/getProfile",{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            setData(response.data.currUser)
        })
    },[])
    
    return (
        <div>
            {data && (<div className={'profile'}>
        {console.log(data)}
        <h1>Profile</h1>
        <div style={{maxWidth:"900px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <h2>{data.username}</h2>
                    <h4>bio</h4>
                </div>
                
                {/* Profile Picture */}
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                        src={data.profile_img}
                    />
                </div>
                {/* Right Side Info */}
                <div>
                    <h2>{data.name}</h2>
                    <div style={{display:"flex",justifyContent:"space-between",width:"130%"}}>
                        <h6>{data.posts.length} posts</h6>
                        <Link to='/profile/followers' className="link">{data.users_followed.length} followers</Link>
                        <Link to='/profile/following' className="link">{data.users_following.length} following</Link>
                        <Link to='/profile/topics' className="link">{data.topics_followed.length} topics</Link>
                    </div>
                </div>
            </div>

            <div className="timeline">
                <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
            </div>
        </div>
    </div>)}
        </div>
        
        
    ) 
}

export default Profile