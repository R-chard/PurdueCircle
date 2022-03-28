import React, { useState } from 'react'

import '../styles/PostView.css'
import Button from './Button'

const InlinePost = (props) => {
    const { post } = props

    console.log("post: ", post);

    //TODO author stuff
    const profilePic = post.author.profile_img;
    const authorName = post.postedAnon ? "-----" : post.author.username
    const message = post.message
    const date = new Date(post.datePosted).toLocaleString('en-us', {month: 'long', day: 'numeric'})
    const numComments = post.comments.length

    const [isLiked, setIsLiked] = useState(post.hasLiked)
    const [likes, setLikes] = useState(post.likes)

    //sends update likes
    const likeHandler = () => {
        //TODO add to user's likes
        //TODO sent to backend

        if (isLiked) {
            const updatedPostObj = {...post, isLiked: false, likes: likes - 1}
            setIsLiked(false)
            setLikes(likes - 1)
        } else {
            const updatedPostObj = {...post, isLiked: true, likes: likes + 1}
            setIsLiked(true)
            setLikes(likes + 1)
        }
        console.log("like")
    }

    const liked = () => {
        return isLiked ? 'primary' : 'secondary'
    }

    return (
        <div className='container postView'>
            <div className='contents'>
                {/* <UserInfo profilePic={profilePic} author={authorName} date={date} likes={likes} liked={liked} likeHandler={likeHandler}/> */}
                <PostMetadata authorName={authorName} profilePic={profilePic} date={date} likes={likes} liked={liked} 
                    likeHandler={likeHandler} numComments={numComments}/>
                <p className='post'>
                    {message}
                </p>
            </div>
        </div>
    )
} //PostView

const PostMetadata = (props) => {
    const { authorName, profilePic, date, likes, likeHandler, liked, numComments } = props

    return (
        <div className='userInfo'>
            <div>
                <img className='profilePic'
                    src={profilePic}
                    alt="profile"
                />
            </div>
            <div className='author'>{authorName}</div>
            <div className='dot'>•</div>
            <div className='date'>{date}</div>
            <div className='pushRight'>{numComments} com</div>
            <div>
                {likes}
                <Button className={`button ${liked()} likeButton`} onClick={likeHandler} text={`${likes} likes`} />
                <button className='likeButton' onClick={likeHandler}>
                    <img src='/likedIcon.png' alt='pic'/>
                </button>
            </div>
        </div>
    )
} //UserInfo

export default InlinePost