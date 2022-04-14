import React,{ useEffect,useState } from "react"
import { Link,useLocation } from "react-router-dom" 
import "../styles/Profile.css"
import axios from "axios"
import {Button, ButtonBlue, ButtonTwoColor} from "../components/Button"
import Tab from "../components/Tab"
import InlinePost from "../components/InlinePost"
import { useHistory } from 'react-router-dom';
import { TabPane } from "react-bootstrap"
import InteractionView from "../components/InteractionView"

const Profile = (props) => {
    const history = useHistory()
    const [data, setData] = useState(null)
    const [refresh,setRefresh] = useState(false)
    const [page, setPage] = useState(1)
    const [followed, setFollowed] = useState(0);
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
    
    const location = useLocation()
    useEffect(()=>{
        axios.get("/api/user" + location.pathname,{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            console.log("profile data", response.data)
            setData(response.data.user)
            setFollowed(response.data.user.following)
            const posts = response.data.user.posts
            const interactions = response.data.user.interactions
            const intrPosts = [];
            interactions.forEach(element => {
                intrPosts.push(element.post)
            });
            setTabContent([
                {
                    title: "Posts",
                    content: posts
                },
                {
                    title: "Interactions",
                    content: intrPosts,
                    interactions: interactions
                }
            ])
        })
    },[location.pathname,refresh])


    const followHandler =() => {
        setFollowed(true);
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
        setFollowed(false);
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

    return (
        <>
            {data && tabContent && (<div className={'contents profile'}>
            <div className="profileData">
                {/* Profile Picture */}
                    <img className="main profilePic" alt={`Profile pic for ${data.name}`}
                        src={data.profile_img}
                    />
                {/* Right Side Info */}
                <div className='userInfo0'>
                    <div className='userInfo1'>
                        <h1>{data.username}</h1>
                            {data.selfProfile ? <ButtonTwoColor className={`button secondary`} text = "Edit Profile" onClick={()=>{history.push("/settings")}}/>
                                :<ButtonTwoColor className={`button ${followed ? "secondary" : "primary"}`} text={followed ? 'Unfollow' : "Follow"} onClick={()=>{followed ? unfollowHandler() : followHandler()}}/>
                            }
                    </div>         
                    <div className='userInfo2'>
                        <h6>{data.posts.length} posts</h6>
                        <Link to={'/followers/' +data.username} className="link">{data.users_followed.length} followers</Link>
                        <Link to={'/following/' +data.username} className="link">{data.users_following.length} following</Link>
                        <Link to={'/topics/' +data.username} className="link">{data.topics_followed.length} topics</Link>
                    </div>
                    <h6 className='name'>{data.name}</h6>
                    <h6>{data.biography}</h6>
                </div>
            </div>
            <hr/>

            {/* Userline tabs */}
            
            <>
                <Tab>
                {tabContent.map((tab, idx) => (
                    <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>
                        {<div className="container postView">
                            {tab.content.length === 0 ? <div>There are no posts to show </div> : (
                                tab.interactions ? 
                                    (tab.interactions.map(post => (
                                            <InteractionView key={post.post_id} post={post.post} username={data.username} interaction={post} presetSize={false}></InteractionView>
                                    ))) 
                                    : (tab.content.map(post => (
                                        <div className="container postView">
                                            <div className={`inlinePost contents`}>
                                                <InlinePost key={post._id} post={post}/>
                                            </div>
                                        </div>
                                    )))
                                )
                            }
                            <div className="footer">
                                    {prevEnabled()}
                                    <Button onClick={nextHandler} text='Next'/>
                            </div> 
                        </div>
                        }
                    </Tab.TabPane>
                ))}
                </Tab>
            </>
            
    </div>)}
        </>
    ) 
}

export default Profile