import React, { useState } from 'react'

import '../styles/PostView.css'
import Button from './Button'
import Field from './Field'


const PostView = () => {
    const comment1 = { author: "Jeff", date: new Date("2022-03-3T22:11:12.129+00:00")}
    const comment2 = { author: "A person", date: new Date("2022-02-30T22:11:12.129+00:00")}
    const comment3 = { author: "Tim Apple", date: new Date("2022-01-03T22:11:12.129+00:00")}

    const post = { author: "jimothy", isAnon: false, message: `This is a post with some text that shows how a post with some text can be
    displayed`, likes: 4, datePosted: new Date("2022-02-24T22:11:12.129+00:00"), 
        comments: [comment1, comment2, comment3], topics: ["posts", "society"], isLiked: false}

    const author = post.isAnon ? "anonymous" : post.author
    const message = post.message
    const date = post.datePosted.toLocaleString('en-us', {month: 'long', day: 'numeric'})
    // const isLiked = post.isLiked

    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [likes, setLikes] = useState(post.likes)
    const [comment, setComment] = useState('')

    const likeHandler = () => {

        if (isLiked) {
            setIsLiked(false)
            setLikes(likes - 1)
        } else {
            setIsLiked(true)
            setLikes(likes + 1)
        }
        console.log("like")
    }

    const liked = () => {
        return isLiked ? 'primary' : 'secondary'
    }

    const handleNewComment = (e) => {
        e.preventDefault()

        console.log(comment)
    }

    return (
        <div className='container postView'>
            <div className='contents'>
                <div className='userInfo'>
                    <div>
                        <img className='profilePic'
                            src={"https://imageio.forbes.com/specials-images/imageserve/5fe74d45a9c2a2d204db2948/0x0.jpg?format=jpg&width=1200&fit=bounds"}
                            alt="profile"
                        />
                    </div>
                    <div className='author'>{author}</div>
                    <div className='dot'>•</div>
                    <div className='date'>{date}</div>
                    <div className='likeButton'>
                        <Button className={`button ${liked()}`} onClick={likeHandler} text={`${likes} likes`} />
                    </div>
                </div>
                <p className='post'>
                    {message}
                </p>
                <div className='comments'>
                    <form className='newComment' onSubmit={handleNewComment}>
                        <Field className='multiLine comment' rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={'Add a comment'} />
                        {/* <TextareaAutosize placeholder='Add a comment' className='field' onChange={(e) => setComment(e.target.value)} value={comment}/> */}
                        <Button className='formSubmit' text={'Reply'} />
                    </form>
                </div>
            </div>
        </div>
    )
} //PostView

export default PostView
