import React, { useEffect, useState, useRef,useCallback } from "react"
import { Link,useLocation } from "react-router-dom" 
import "../styles/Profile.css"
import axios from "axios"
import {ButtonTwoColor} from "../components/Button"
import Tab from "../components/Tab"
import InlinePost from "../components/InlinePost"
import { useHistory } from 'react-router-dom';
import InteractionView from "../components/InteractionView"

const Profile = (props) => {
    const history = useHistory()
    const [data, setData] = useState(null)
    const [refresh,setRefresh] = useState(false)
    const [page, setPage] = useState(1)
    const [followed, setFollowed] = useState(0);
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [changing,setChanging] = useState(false)
    const [user,setUser] = useState("")
    const observer = useRef()
    const location = useLocation()
    const [tabContent, setTabContent] = useState([
        {
            title: "Posts",
            content: []
        },
        {
            title: "Interactions",
            content: [],
            interactions: []
        }
    ])
    

    const lastElement = useCallback(element => {
        if (loading) return

        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entires => {
            if (entires[0].isIntersecting && hasMore) {
                setPage(page => page + 1)
            }
        })

        if (element) {
            observer.current.observe(element)
        }
        
    }, [loading, hasMore])
    useEffect(()=>{
        if(user.length > 0 && location.pathname != user){
            setUser(location.pathname)
            setPage(1)
            console.log("swap")
            setChanging(true)
            setTabContent([{
                title: "Posts",
                content: []
            },
            {
                title: "Interactions",
                content: [],
                interactions: []
            }])
            return
            
        }
        setLoading(true)
        axios.get("/api/user" + location.pathname + "?page=" + page.toString(),{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            setData(response.data.user)
            setFollowed(response.data.user.following)
            setLoading(false)
            setChanging(false)
            setUser(location.pathname)
            const posts = response.data.user.posts
            const interactions = response.data.user.interactions
            const savedPosts = response.data.user.saved_posts;
            
            if(response.data.user.selfProfile){
                if(response.data.user.posts.length == 0 && 
                    response.data.user.interactions.length == 0 &&
                    response.data.user.saved_posts.length == 0){
                    setHasMore(false)
                }
            } else{
                if(response.data.user.posts.length == 0 && 
                    response.data.user.interactions.length == 0){
                    setHasMore(false)
                }
            }
            const intrPosts = [];
            interactions.forEach(element => {
                intrPosts.push(element.post)
            });
            
            setTabContent(tabContent => {
                if(response.data.user.selfProfile){
                    if (tabContent.length === 3){
                        return [
                            {
                                title: "Posts",
                                content: tabContent[0].content.concat(posts)
                            },
                            {
                                title: "Interactions",
                                content: tabContent[1].content.concat(intrPosts),
                                interactions: tabContent[1].interactions.concat(interactions)
                            },{
                                title: "Saved",
                                content: tabContent[2].content.concat(savedPosts)
                            }
                        ]

                    }
                    return [
                        {
                            title: "Posts",
                            content: posts
                        },
                        {
                            title: "Interactions",
                            content: intrPosts,
                            interactions: interactions
                        },{
                            title: "Saved",
                            content: savedPosts
                        }
                    ]
                }
                return [
                    {
                        title: "Posts",
                        content: tabContent[0].content.concat(posts)
                    },
                    {
                        title: "Interactions",
                        content: tabContent[1].content.concat(intrPosts),
                        interactions: tabContent[1].interactions.concat(interactions)
                    }
                ]
                
            })        
        })
    },[location.pathname,refresh,page,user])


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

    return (
        <>
            {data && tabContent && !changing && (<div className={'contents profile'}>
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
                                    (tab.interactions.map((post,index) => {
                                        if (tab.content.length === index + 1){
                                            return (
                                                <div ref ={lastElement} className={'interaction contents'}>
                                                <InteractionView 
                                                    key={post.post_id} 
                                                    post={post.post} 
                                                    username={data.username} 
                                                    interaction={post} 
                                                    presetSize={false}
                                                />
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div className={'interaction contents'}>
                                                <InteractionView 
                                                    key={post.post_id} 
                                                    post={post.post} 
                                                    username={data.username} 
                                                    interaction={post} 
                                                    presetSize={false} 
                                                />
                                                </div>
                                            )
                                        }
                                    }))
                                    : (tab.title === "Posts"?(tab.content.map((post,index) => {
                                        console.log("index is " + index.toString())
                                        console.log("tab.content.length is ", tab.content.length.toString())
                                        if(tab.content.length === index+1){
                                            return(
                                                <div className="container postView" ref={lastElement}>
                                                    <div className={`inlinePost contents`}>
                                                <InlinePost key={post._id} post={post}/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return(
                                            <div className="container postView">
                                                <div className={`inlinePost contents`}>
                                            <InlinePost key={post._id} post={post}/>
                                                </div>
                                            </div>
                                        )
                                        
                                    })):(tab.content.map((post,index)=>{
                                        if(tab.content.length === index+1){
                                            return(
                                                <div className="container postView" ref={lastElement}>
                                                    <div className={`inlinePost contents`}>
                                                <InlinePost key={post._id} post={post}/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return(
                                            <div className="container postView">
                                                <div className={`inlinePost contents`}>
                                            <InlinePost key={post._id} post={post}/>
                                                </div>
                                            </div>
                                        )
                                    })))
                                )
                            }
                            <div className="footer" />
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