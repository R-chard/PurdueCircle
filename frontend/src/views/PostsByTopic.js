import axios from "axios"
import React,{ useState,useEffect } from "react"
import {useLocation} from "react-router-dom"

const PostsByTopic = () => {
    const [data,setData] = useState(null)
    const location = useLocation() 
    const title = location.pathname.split("/")[2]

    useEffect(()=>{
        axios.get("/api/topic/getposts/" + title,{
            withCredentials: true, credentials:"include"
          }).then((response)=>{console.log(response.data.data);setData(response.data.data)})
    },[location.pathname,title])

    const followHandler =() => {
        axios.post("/api/topic/follow",{
            title
        },{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            if(response.data.success){
                alert("Followed " + title)
        }}
        )
    }
    
    const unfollowHandler =() =>{
        axios.post("/api/topic/unfollow",{
            title
        },{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            if(response.data.success){
                alert("Unfollowed " + title)
        }}
        )
    }

    // TODO: check data.following. Null means no buttons. True = should have unfollow. False = should have follow
    return(
        // TODO: pass data as props into post components
        <div> 
        {data && (data.posts.length === 0 ? <div>There are no posts with the topic "{title}" </div> : (
            data.posts.map(post => (
                <div key={post._id} style={{display:"flex"}}>
                    <h2>{post.message}</h2> 
                </div>
            ))
        ))}
        
        </div>
    )
}

export default PostsByTopic