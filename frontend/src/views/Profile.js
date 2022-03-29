import React,{ useEffect,useState } from "react"
import { Link,useLocation } from "react-router-dom" 
import "../styles/Profile.css"
import axios from "axios"
import Button from "../components/Button"
import Tab from "../components/Tab"

const Profile = (props) => {
    
    const [data, setData] = useState(null)
    const [followed, setFollowed] = useState(null);
    const [followedHandler, setFollowedHandler] = useState(null);
    const tabContent = [
        {
            title: "Posts",
            content: `Posts go here`
        },
        {
            title: "Interactions",
            content: `Interactions go here`
        }
    ];
    const location = useLocation()
    useEffect(()=>{
        axios.get("/api/user" + location.pathname,{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            setData(response.data.reqUser)
            setFollowed("Follow")
            //setFollowedHandler(followHandler)
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
                margin:"10px 0px",
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
                    <div style={{display:"flex", justifyContent:"space-around", margin:"5px 0px", height:"20%"}}>
                        <h1>{data.username}</h1>
                        <Button className="formSubmit" text={followed} onClick={followedHandler}></Button>
                    </div>         
                    <div style={{display:"flex",justifyContent:"space-between", margin: "15px 0px", width:"120%"}}>
                        <h6>{data.posts.length} posts</h6>
                        <Link to={'/followers/' +data.username} className="link">{data.users_followed.length} followers</Link>
                        <Link to={'/following/' +data.username} className="link">{data.users_following.length} following</Link>
                        <Link to={'/topics/' +data.username} className="link">{data.topics_followed.length} topics</Link>
                    </div>
                    <h6>{data.name}</h6>
                    <h6>{data.biography}</h6>
                </div>
            </div>

            {/* Userline tabs */}
            
            <div className="col text-center">
                <Tab>
                {tabContent.map((tab, idx) => (
                    <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>
                    {tab.content}
                    </Tab.TabPane>
                ))}
                </Tab>
            </div>
            
        </div>
    </div>)}
        </div>
    ) 
}

export default Profile