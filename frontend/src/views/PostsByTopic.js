import axios from "axios"
import React,{ useState,useEffect } from "react"
import {useLocation} from "react-router-dom"

const PostsByTopic = () => {
    const [posts,setPosts] = useState(null)
    const location = useLocation() 
    const title = location.pathname.split("/")[2]
    
    useEffect(()=>{
        axios.get("/api/topic/getposts/" + title,{
            withCredentials: true, credentials:"include"
          }).then((response)=>setPosts(response.data.posts))
    },[location.pathname])

    return(
        // TODO: pass data as props into post components
        <div> 
        {posts && (posts.length === 0 ? <div>There are no posts with the topic "{title}" </div> : (
            posts.map(post => (
                <div key={post._id} style={{display:"flex"}}>
                    <h2>{post.message}</h2> 
                </div>
            ))
        ))}
        
        </div>
    )
}

export default PostsByTopic