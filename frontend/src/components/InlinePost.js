import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

import '../styles/PostView.css'
import formatDate from '../utils/formatDate'

const InlinePost = (props) => {
    const { post } = props
    let { presetSize } = props

    // console.log("post: ", post);

    const profilePic = post.author.profile_img;
    const authorName = post.postedAnon ? "-----" : post.author.username
    const message = post.message
    const date = formatDate(post.datePosted)
    const numComments = post.comments.length
    const topics = post.topicNames

    const [isLiked, setIsLiked] = useState(post.hasLiked)
    const [likes, setLikes] = useState(post.likes)

    //if unspecified, uses preset size in PostView.css, otherwise uses that specified in another CSS
    if (presetSize === undefined) {
        presetSize = ' presetSize'
    } else {
        presetSize = ''
    }

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
            <div className={`contents${presetSize}`}>
                {/* <UserInfo profilePic={profilePic} author={authorName} date={date} likes={likes} liked={liked} likeHandler={likeHandler}/> */}
                <PostMetadata authorName={authorName} profilePic={profilePic} date={date} likes={likes} liked={liked} isLiked={isLiked}
                    likeHandler={likeHandler} numComments={numComments} post={post}/>
                <div className='topics'>
                    <div className='topicsTitle'>Topics:</div>
                    {topics.length === 0 ? <div>&nbsp;No topics.</div> : (
                        topics.map((topic, i) => {
                            const num = Math.round(Math.random() * 1000000)
                            if (i === 0) {
                                return <div key={num}>&nbsp;{topic}</div>
                            } else {
                            return <div key={num}>,&nbsp;{topic}</div>
                            }
                        })
                    )}
                </div>
                
                <Link 
                to={"/post/" + post._id}
                style={{ color: 'inherit', textDecoration: 'inherit'}} className='post'>
                    <p>
                    {message}
                    </p>
                </Link>
            </div>
    )
} //PostView

const PostMetadata = (props) => {
    const { authorName, profilePic, date, likes, likeHandler, liked, isLiked, numComments, post } = props

    const renderUsername = () => {
        if (post.postedAnon) {
            return (
                <div className='author'>------</div>
            )
        } else {
            return (
                <Link to ={"/profile/" + authorName} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <div className='author'>{authorName}</div>
                </Link>
            )
        }
    }

    return (
        <div className='userInfo'>

            {!post.postedAnon && <Link to ={"/profile/" + authorName}>
                <img className='profilePic'
                    src={profilePic}
                    alt="profile"
                />
                </Link>}

            {renderUsername()}
            
            <div className='dot'>•</div>
            <Link 
                to={"/post/" + post._id}
                style={{ color: 'inherit', textDecoration: 'inherit'}} className='date'>
                {date}
            </Link>
            <div className='pushRight'>
                <div className='likeButton'>
                    {likes}
                    <button className='button likeButton' onClick={likeHandler}>
                        {isLiked ? <img src='/likedIcon.png' alt='pic'/> : <img src='/unlikedIcon.png' alt='pic'/>}
                    </button>
                </div>
                <div className='numComments'>{numComments} {numComments === 1 ? 'comment' : 'comments'}</div>
            </div>
        </div>
    )
} //PostMetadata

export default InlinePost
