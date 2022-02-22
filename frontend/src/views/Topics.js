import React from 'react'
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"

const Topics = () => {
    redirectIfNotAuth()

    const topicList = [
        {
            name: 'Topic1',
            followers: 50
        },
        {
            name: 'Topic2',
            followers: 500
        },
        {
            name: 'Topic3',
            followers: 5000
        }
    ]
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