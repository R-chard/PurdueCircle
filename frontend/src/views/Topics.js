import React,{useState,useEffect} from 'react'
import axios from "axios"

const Topics = () => {

    const [topicList, setTopicList]= useState(null)
    useEffect(()=>{
        axios.get("/api/user/getFollowedTopics",{
            withCredentials: true, credentials:"include"
        }).then((response)=>
            setTopicList(response.data.followedTopicObjects)
        )
    },[])
    
  return (
    <div>
        <h1>Topics</h1>
        {topicList != null &&( topicList.length == 0 ? <div>You are not following any topics right now </div>:
            topicList.map(topic => (
                <div key={topic._id} style={{display:"flex",justifyContent:"space-around", width:"200px"}}>
                    <h2>{topic.title}</h2>
                </div>
            ))
        )}
    </div>
  )
}

export default Topics