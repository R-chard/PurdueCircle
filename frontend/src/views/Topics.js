import React from 'react'
import { useHistory } from 'react-router-dom'
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"

const Topics = () => {
    const history = useHistory()
    redirectIfNotAuth(history)

    const [topicList, setTopicList]= useState[[]] 
    useEffect(()=>{
        axios.get("/api/user/getFollowedTopics",{
            withCredentials: true, credentials:"include"
        }).then((response)=>
            setTopicList(response.data.topicList)
        )
    },[])
    
  return (
    <div>
        <h1>Topics</h1>
        {
            topicList.map(topic => (
                <div style={{display:"flex",justifyContent:"space-around", width:"200px"}}>
                    <h2>{topic.name}</h2>
                    <h2>{topic.followers}</h2> 
                </div>
            ))
        }
    </div>
  )
}

export default Topics