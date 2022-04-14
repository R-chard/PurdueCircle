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
    const authorName = post.postedAnon ? "Anonymous" : post.author.username
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
            <>
                {/* <UserInfo profilePic={profilePic} author={authorName} date={date} likes={likes} liked={liked} likeHandler={likeHandler}/> */}
                <PostMetadata authorName={authorName} profilePic={profilePic} date={date} likes={likes} liked={liked} isLiked={isLiked}
                    likeHandler={likeHandler} numComments={numComments} post={post}/>
                <div className='numComments'>{numComments} {numComments === 1 ? 'comment' : 'comments'}</div>
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
            </>
    )
} //PostView

const PostMetadata = (props) => {
    const { authorName, profilePic, date, likes, likeHandler, isLiked, post } = props
    
    const likedClass = () => {
        if (isLiked) {
            return ' primary'
        } else {
            return ''
        }
    }

    const renderUsername = () => {
        if (post.postedAnon) {
            return (
                <div className='author'>Anonymous</div>
            )
        } else {
            return (
                <Link to ={"/profile/" + authorName} className='author'>
                    {authorName}
                </Link>
            )
        }
    }

    return (
        <div className='userInfo'>

            {!post.postedAnon && <Link to ={"/profile/" + authorName}>
                <img className='profilePic'
                    src={profilePic}
                    alt={`Profile pic for ${authorName}`}
                />
                </Link>}

            <div className='postData'>
                {renderUsername()}
                
                <div className='dot'>•</div>
                <Link 
                    to={"/post/" + post._id}
                    style={{ color: 'inherit', textDecoration: 'inherit'}} className='date'>
                    {date}
                </Link>
            </div>

            <div className='pushRight'>
                <div className={`likeButton${likedClass()}`}>
                    {likes}
                    <button className='button likeButton' onClick={likeHandler}>
                        {/* {isLiked ? <img src='/likedIcon.png' alt='Like icon'/> : <img src='/unlikedIcon.png' alt='Unliked icon'/>} */}
                        <svg className={'like-svg'} viewBox="0 0 179 159">
                            <path d="M 122.824997 13.062027 C 111.565033 13.062027 100.956482 17.466751 92.98455 25.438675 L 89.696526 28.726715 L 86.346451 25.376648 
                                C 78.374527 17.404709 67.765976 13 56.506016 13 C 45.277077 13 34.699543 17.373688 26.727617 25.345627 C 18.755692 33.317551 14.381989 
                                43.895088 14.381989 55.155045 C 14.381989 66.415001 18.786711 76.992538 26.758636 84.964462 L 85.850143 144.055969 L 85.974228 144.180054 
                                C 86.997856 145.20369 88.362701 145.699982 89.696526 145.699982 C 91.061363 145.699982 92.426216 145.172668 93.449844 144.149033 L 152.541351 
                                85.057518 C 160.51329 77.085602 164.917999 66.508064 164.917999 55.2481 C 164.917999 43.988144 160.544312 33.379585 152.572372 25.438675 
                                C 144.63147 17.43573 134.053925 13.062027 122.824997 13.062027 Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
} //PostMetadata

export default InlinePost
