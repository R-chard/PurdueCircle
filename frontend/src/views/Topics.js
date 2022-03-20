import React,{useState,useEffect} from 'react'
import {useLocation} from "react-router-dom"
import axios from "axios"

const Topics = () => {

    const [topicList, setTopicList]= useState(null)
    const location = useLocation()
    useEffect(()=>{
        axios.get("/api/user" + location.pathname,{
            withCredentials: true, credentials:"include"
        }).then((response)=>
            setTopicList(response.data.followedTopicObjects)
        )
    },[location.pathname])
    
  return (
    <div>
        <h1>Topics</h1>
        {topicList != null &&( topicList.length === 0 ? <div>You are not following any topics right now </div>:
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