import React from 'react'

import '../styles/PostView.css'

const PostView = () => {
    const comment1 = { author: "Jeff", date: new Date("2022-03-3T22:11:12.129+00:00")}
    const comment2 = { author: "A person", date: new Date("2022-02-30T22:11:12.129+00:00")}
    const comment3 = { author: "Tim Apple", date: new Date("2022-01-03T22:11:12.129+00:00")}

    const post = { author: "Me", isAnon: false, message: "This is a post", likes: 4, datePosted: new Date("2022-02-24T22:11:12.129+00:00"), 
        comments: [comment1, comment2, comment3], topics: ["posts", "society"]}

    const author = post.isAnon ? "anonymous" : post.author
    const message = post.message
    const likes = post.likes
    const date = post.datePosted.toLocaleString('en-us')

    return (
        <div className='contents postView'>
            <div className='author'>By {author}</div>
            <p>
                {message}
            </p>
            <div>{date}</div>
            <div>{likes}</div>
        </div>
    )
} //PostView

export default PostView
