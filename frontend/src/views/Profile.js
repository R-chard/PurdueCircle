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
    const [tabContent, setTabContent] = useState([])
    const [refresh,setRefresh] = useState(false)
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
        })

        //replace with api
        const comment1 = { author: "Jeff", date: new Date("2022-03-03T22:11:12.129+00:00"), id: 421432, message: "My name is Jeff"}
        const comment2 = { author: "A person", date: new Date("2022-02-30T22:11:12.129+00:00"), id: 91248057, message: "Beep boop"}
        const comment3 = { author: "Tim Apple", date: new Date("2022-01-13T22:11:12.129+00:00"), id: 6453141, message: "Good Morning!"}
        const comment4 = { author: "Moana", date: new Date("2022-01-31T22:11:12.129+00:00"), id: 9184537, message: "The ocean is calling me and I must go"}
        const comment5 = { author: "Joe", date: new Date("2022-02-17T22:11:12.129+00:00"), id: 3978514, message: "Who am I? What is existence but the affirmation by others that you exist? What is love?"}
        const comment6 = { author: "Jimothy", date: new Date("2022-03-23T22:11:12.129+00:00"), id: 340789541, message: "Comment sections amirite"}

        const objCommentsArray1 = [comment1, comment2, comment5]
        const objCommentsArray2 = [comment3, comment4, comment5, comment6]

        const objProfilePic = "https://imageio.forbes.com/specials-images/imageserve/5fe74d45a9c2a2d204db2948/0x0.jpg?format=jpg&width=1200&fit=bounds";
        const post1 = { _id: 23451234312, author: { username: "jimothy", profile_img: objProfilePic }, postedAnon: false, message: `This is a post with some text that shows how a post with some text can be
        displayed`, likes: 4, datePosted: new Date("2022-02-24T22:11:12.129+00:00"), 
            comments: objCommentsArray1, topicNames: ["posts", "society"], hasLiked: true }

        const post2 = { _id: 8973241613, author: { username: "dave", profile_img: objProfilePic }, postedAnon: false, message: `This is a very long post to show how
        a long post would be displayed. This message has been brought to you by Raid Shadow Legeneds. Raid: Shadow Legends is a mobile-fantasy 
        RPG game for mobile and PC developed by Plarium Games. The game takes place in Teleria, which has been subjugated by the Dark Lord 
        Siroth. The player goes through twelve levels in single player mode, with a multiplayer PVP mode deciding player rankings`, 
        likes: 10, datePosted: new Date("2022-03-05T22:11:12.129+00:00"), 
            comments: objCommentsArray2, topicNames: ["posts", "society"], hasLiked: false }

        const post3 = { ...post2, _id: 239487123, topicNames: []}
        const post4 = { ...post2, _id: 321847134}
        
        setTabContent([
            {
                title: "Posts",
                content: [post1, post2, post3, post4]
            },
            {
                title: "Interactions",
                content: []
            }
        ])
    //replace with api
    },[location.pathname,refresh])


    const followHandler =() => {
        axios.post("/api/user/follow",{
            otherUser: data._id
        },{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            if(response.data.success){
                setRefresh(!refresh)
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
                setRefresh(!refresh)
        }}
        )
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