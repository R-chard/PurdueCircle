import axios from "axios"
import React,{ useState,useEffect } from "react"
import {ButtonTwoColor} from "../components/Button"
import {useLocation, Link} from "react-router-dom"

import InlinePost from "../components/InlinePost"

const PostsByTopic = () => {
    const [data,setData] = useState(null);
    const [followed, setFollowed] = useState(0);
    const location = useLocation() 
    const title = location.pathname.split("/")[2]

    useEffect(()=>{
        axios.get("/api/topic/getposts/" + title,{
            withCredentials: true, credentials:"include"
          }).then((response)=>{
              console.log(response.data.data);
              setData(response.data.data)
              setFollowed(response.data.data.following)
            })
    },[location.pathname,title])

    const followHandler =() => {
        setFollowed(true);
        axios.post("/api/topic/follow",{
            title
        },{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            if(response.data.success){
                //alert("Followed " + title)
        }})
    }
    
    const unfollowHandler =() =>{
        setFollowed(false)
        axios.post("/api/topic/unfollow",{
            title
        },{
            withCredentials: true, credentials:"include"
        })
    }

    // TODO: check data.following. Null means no buttons. True = should have unfollow. False = should have follow
    return(
        // TODO: pass data as props into post components
        
        data && <div className="container postView"> 
            <div style={{display:"flex", justifyContent:"space-around", margin:"5px px", height:"20%"}}>
                        <h1>{title}</h1>
                        <div style={{margin: "5px 10px"}}>
                            <ButtonTwoColor className={`button ${followed ? "secondary" : "primary"}`} text={followed ? 'Unfollow' : "Follow"} onClick={()=>{followed ? unfollowHandler() : followHandler()}}/>
                        </div>     
            </div>   
        {(data.posts.length === 0 ? <div>There are no posts with the topic "{title}" </div> : (
            data.posts.map(post => (
                <div className={`inlinePost contents presetSize`}>
                    <InlinePost key={post._id} post={post}/>
                </div>
                // <div key={post._id} style={{display:"flex"}}>
                //     <h2>{post.message}</h2> 
                // </div>
            ))
        ))}
        
        </div>
    )
} //PostsByTopic

export default PostsByTopic