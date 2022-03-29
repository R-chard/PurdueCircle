import React,{ useEffect,useState } from "react"
import { Link,useLocation } from "react-router-dom" 
import "../styles/Profile.css"
import axios from "axios"

const Profile = (props) => {
    
    const [data, setData] = useState(null)
    const location = useLocation()
    useEffect(()=>{
        axios.get("/api/user" + location.pathname,{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            console.log(response.data)
            setData(response.data.reqUser)
        })
    },[location.pathname])

    const followHandler =() => {
        axios.post("/api/user/follow",{
            otherUser: data._id
        },{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            if(response.data.success){
                alert("Followed " + data.username)
        }}
        )
    }
    
    const unfollowHandler =() =>{
        axios.post("/api/user/unfollow",{
            otherUser: data._id
        },{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            if(response.data.success){
                alert("Unfollowed " + data.username)
        }}
        )
    }
    return (
        <div>
            {data && (<div className={'contents profile'}>
        <h1>Profile</h1>
        <div style={{maxWidth:"800px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                {/* Profile Picture */}
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px", objectFit: "cover"}}
                        src={data.profile_img}
                    />
                </div>
                {/* Right Side Info */}
                <div>
                    <h1>{data.username}</h1>
                    <div style={{display:"flex",justifyContent:"space-between",width:"120%"}}>
                        <h6>{data.posts.length} posts</h6>
                        <Link to={'/followers/' +data.username} className="link">{data.users_followed.length} followers</Link>
                        <Link to={'/following/' +data.username} className="link">{data.users_following.length} following</Link>
                        <Link to={'/topics/' +data.username} className="link">{data.topics_followed.length} topics</Link>
                    </div>
                    <h2>{data.name}</h2>
                    <h4>{data.biography}</h4>
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