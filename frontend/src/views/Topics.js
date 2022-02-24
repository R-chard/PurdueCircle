import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"
import axios from "axios"

const Topics = () => {
    const history = useHistory()
    redirectIfNotAuth(history)

    const [topicList, setTopicList]= useState([])
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
        {topicList.length === 0 ? <div>You are not following any topics right now </div>:
            topicList.map(topic => (
                <div key={topic._id} style={{display:"flex",justifyContent:"space-around", width:"200px"}}>
                    <h2>{topic.title}</h2>
                </div>
            ))
        }
    </div>
  )
}

export default Topics