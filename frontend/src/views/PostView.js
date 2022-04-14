import React, { useState, useEffect } from 'react'
import {useLocation,Link} from "react-router-dom"
import axios from "axios"
import '../styles/PostView.css'
import { ButtonBlue, ButtonTwoColor } from '../components/Button'
import Field from '../components/Field'
import formatDate from "../utils/formatDate"

const PostView = () => {
    //replace with api

    const [commentError, setCommentError] = useState(null)
    
    const location = useLocation()
    const postID = location.pathname.split("/")[2]
    const [post,setPost] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)
    const [isSaved, setIsSaved] = useState(false)
    const [newComment,setNewComment] = useState("")
    const [numComments, setNumComments] = useState(0)
    const [postedAnon, setPostedAnon] = useState(false)
    const [updatedPost, setUpdatedPost] = useState(false)
    
    useEffect(()=>{
        
        axios.get("/api/post/postById/" + postID,{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            setPost(response.data.post)
            setIsLiked(response.data.post.hasLiked)
            setLikes(response.data.post.likes)
            setNumComments(response.data.post.comments.length)
            setPostedAnon(response.data.post.postedAnon)
            setIsSaved(response.data.post.isSaved)
            console.log(response.data.post)

        })
    },[postID, updatedPost])


    const likeHandler = () => {

        if (isLiked) {
            setIsLiked(false)
            setLikes(likes - 1)
            axios.post("/api/post/unlike",{
                    postID:post._id,
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

    const savedHandler = () => {
        if (isSaved) {
            setIsSaved(false)
            axios.post("/api/post/unsave",{
                postID:post._id,
            },{
                withCredentials: true, credentials:"include"
            })
        } else {
            setIsSaved(true)
            axios.post("/api/post/save",{
                postID:post._id,
            },{
                withCredentials: true, credentials:"include"
            })
        }
    }

    const likedClass = () => {
        return isLiked ? 'primary' : 'secondary'
    }

    const savedClass = () => {
        return isSaved ? 'primary' : ''
    }

    //sends new comment
    const handleNewComment = (e) => {
        e.preventDefault()

        if (newComment.length === 0) {
            setCommentError('Enter a comment')
        } else if (newComment.length > 250) {
            setCommentError('Comment must be less than 250 characters')
        } else {
            axios.post("/api/post/comment",{
                postID:post._id,
                message:newComment,
            },{
                withCredentials: true, credentials:"include"
            }).then(response=>{
                console.log("comment res", response)
                if (response.data.success){
                    setNewComment("")
                    setUpdatedPost(updatedPost ? false : true)
                }})
        }
    }

    //for error message
    const hasError = (input) => {
        switch (input) {
            case 'commentField':
                if (commentError === 'Enter a comment') {
                    return 'fieldError'
                }
                if (commentError === 'Comment must be less than 250 characters') {
                    return 'fieldError'
                }
                break;
            default:
                break;
        }
    }

    const renderUsername = () => {
        if (postedAnon) {
            return (
                <div className='author'>Anonymous</div>
            )
        } else {
            return (
                <Link to ={"/profile/" + post.author.username} style={{textDecoration: 'none'}}>
                    <div className='author'>{post.author.username}</div>
                </Link>
            )
        }
    }

    //updates value
    const commentFieldHandler = (e) => {
        setNewComment(e.target.value)
        setCommentError(null)
    }

    return (
        post && (<div className='container postView'>
            <div className='contents presetSize'>
                <div className='userInfo'>
                    <div>
                        {!postedAnon && <Link to ={"/profile/" + post.author.username}>
                            <img className='profilePic' src={post.author.profile_img} alt={`Profile pic for ${post.author.username}`} />
                        </Link>}
                        
                    </div>
                    <div className='postData'>
                        {renderUsername()}
                        <div className='dot'>•</div>
                        <div className='date'>{formatDate(post.datePosted)}</div>
                    </div>
                    
                    <div className='pushRight'>
                        <button onClick={savedHandler} className='button'>
                            <svg className={`save-svg ${savedClass()}`}>
                                <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21"></polygon>
                            </svg>
                        </button>
                        
                    </div>
                    <ButtonTwoColor className={`button ${likedClass()}`} onClick={likeHandler} text={`${likes} ${likes === 1 ? 'like' : 'likes'}`} />
                    
                </div>
                <div className='topics'>
                    <div className='topicsTitle'>Topics:</div>
                    {post.topicNames.length === 0 ? <div>&nbsp;No topics.</div> : (
                        post.topicNames.map((topic, i) => {
                            const num = Math.round(Math.random() * 1000000)
                            if (i === 0) {
                                return <div key={num}>&nbsp;{topic}</div>
                            } else {
                            return <div key={num}>,&nbsp;{topic}</div>
                            }
                        })
                    )}
                </div>
                <p className='post'>
                    {post.message}
                </p>
                <div className='comments'>
                    <ul>
                        {(numComments > 0) ? post.comments.map((comment) => {
                            
                            return (
                                <div key={comment._id} className='postComment'>
                                    <div className='commentHeader'>
                                        <Link 
                                            to ={"/profile/" + comment.author.username} 
                                            style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                                {comment.author.username}
                                        </Link>
                                        <div>·</div>
                                        <div className='date'>{formatDate(comment.datePosted)}</div>
                                    </div>
                                    <p>{comment.message}</p>
                                </div>
                            )
                        }) : <div className='commentLabel'>There are no comments yet...</div>}
                    </ul>
                    <div className='commentError'>
                        {hasError('commentField') ? commentError : ''}
                    </div>
                    <form className='newComment' onSubmit={handleNewComment}>
                        <Field className={`multiLine ${hasError('commentField')} comment`} rows={3} value={newComment} onChange={commentFieldHandler} placeholder={'Add a comment'} focus={false}/>
                        <ButtonBlue type='formSubmit' text={'Reply'} />
                    </form>
                </div>
            </div>
        </div>
    ))
} //PostView

export default PostView
