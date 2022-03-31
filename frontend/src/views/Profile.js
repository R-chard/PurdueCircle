import React,{ useEffect,useState } from "react"
import { Link,useLocation } from "react-router-dom" 
import "../styles/Profile.css"
import axios from "axios"
import {Button, ButtonBlue} from "../components/Button"
import Tab from "../components/Tab"
import InlinePost from "../components/InlinePost"
import { useHistory } from 'react-router-dom';

const Profile = (props) => {
    const history = useHistory()
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [tabContent, setTabContent] = useState([
        {
            title: "Posts",
            content: []
        },
        {
            title: "Interactions",
            content: []
        }
    ])
    const [followed, setFollowed] = useState(null);
    const [followedHandler, setFollowedHandler] = useState(null);
    
    const location = useLocation()
    useEffect(()=>{
        axios.get("/api/user" + location.pathname,{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            console.log("profile data", response.data)
            setData(response.data.user)
            const posts = response.data.posts
            const intr = response.data.interactions
            setTabContent([
                {
                    title: "Posts",
                    content: posts
                },
                {
                    title: "Interactions",
                    content: intr
                }
            ])
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
    const prevHandler = () => {
        console.log('prev')
        setPage(page - 1)
    }

    const nextHandler = () => {
        console.log('next')
        setPage(page + 1)
    }
    //disables previous button if at start
    const prevEnabled = () => {
        if (page === 1) {
                return <Button text='Previous' className={'disabled'}/>
        } else {
            return <Button onClick={prevHandler} text='Previous'/>
        }
    }

    const renderFollowButton = () => {
        if(data.selfProfile)
            return (<Button text={"Edit Profile"} onClick={()=>{history.push("/settings")}}></Button>) 
        else if(data.following)
            return ( <Button text={"Unfollow"} onClick={()=>{unfollowHandler()}}></Button>)
        return (<ButtonBlue text={"Follow"} onClick={()=>{followHandler()}}></ButtonBlue>)
    }

    return (
        <div>
            {data && tabContent && (<div className={'contents profile'}>
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
                    <div style={{display:"flex", justifyContent:"space-around", margin:"5px px", height:"20%"}}>
                        <h1>{data.username}</h1>
                        <div style={{margin: "5px 10px"}}>
                            {renderFollowButton()}
                        </div>     
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
            
            <div>
                <Tab>
                {tabContent.map((tab, idx) => (
                    <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>
                        {<div className="container postView">
                            {tab.content.length === 0 ? <div>There are no posts to show </div> : (
                                tab.content.map(post => (
                                    <InlinePost key={post._id} post={post}/>
                                )))}
                            <div className="footer">
                                    {prevEnabled()}
                                    <Button onClick={nextHandler} text='Next'/>
                            </div> 
                        </div>
                        }
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