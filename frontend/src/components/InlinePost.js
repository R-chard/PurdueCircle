import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

import '../styles/PostView.css'

const InlinePost = (props) => {
    const { post } = props

    // console.log("post: ", post);

    const profilePic = post.author.profile_img;
    const authorName = post.postedAnon ? "-----" : post.author.username
    const message = post.message
    const date = new Date(post.datePosted).toLocaleString('en-us', {month: 'long', day: 'numeric'})
    const numComments = post.comments.length

    const [isLiked, setIsLiked] = useState(post.hasLiked)
    const [likes, setLikes] = useState(post.likes)

    const likeHandler = () => {
        //TODO add to user's likes
        //TODO send to backend

        if (isLiked) {
            setIsLiked(false)
            setLikes(likes - 1)
            axios.post("/api/post/unlike",{
                    postID:post._id
                },{
                    withCredentials: true, credentials:"include"
                })
        } else {
            setIsLiked(true)
            setLikes(likes + 1)
            axios.post("/api/post/like",{
                postID:post._id
            },{
                withCredentials: true, credentials:"include"
            })
        }
    }

    const liked = () => {
        return isLiked ? 'primary' : 'secondary'
    }

    return (
        // <div className='contaiasfdner postasdfView'>
            <Link 
                to={"/post/" + post._id}
                style={{ color: 'inherit', textDecoration: 'inherit'}}>
                
                <div className='contents'>
                {/* <UserInfo profilePic={profilePic} author={authorName} date={date} likes={likes} liked={liked} likeHandler={likeHandler}/> */}
                <PostMetadata authorName={authorName} profilePic={profilePic} date={date} likes={likes} liked={liked} isLiked={isLiked}
                    likeHandler={likeHandler} numComments={numComments}/>
                <p className='post'>
                    {message}
                </p>
                </div>
            </Link>
            
        // </div>
    )
} //PostView

const PostMetadata = (props) => {
    const { authorName, profilePic, date, likes, likeHandler, liked, isLiked, numComments } = props

    return (
        <div className='userInfo'>
            <div>
                <Link to ={"/profile/" + authorName}>
                <img className='profilePic'
                    src={profilePic}
                    alt="profile"
                />
                </Link>
            </div>
            <Link
                to ={"/profile/" + authorName} 
                style={{ color: 'inherit', textDecoration: 'inherit'}}
            >
            <div className='author'>{authorName}</div>
            </Link>
            
            <div className='dot'>•</div>
            <div className='date'>{date}</div>
            <div className='pushRight'>
                <div className='likeButton'>
                    {likes}
                    <button className='button likeButton' onClick={likeHandler}>
                        {isLiked ? <img src='/likedIcon.png' alt='pic'/> : <img src='/unlikedIcon.png' alt='pic'/>}
                    </button>
                </div>
                <div className='numComments'>{numComments} comments</div>
            </div>
        </div>
    )
} //PostMetadata

export default InlinePost
