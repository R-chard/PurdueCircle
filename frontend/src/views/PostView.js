import React, { useState, useEffect } from 'react'
import {useLocation,Link} from "react-router-dom"
import axios from "axios"
import '../styles/PostView.css'
import { ButtonBlue, ButtonTwoColor } from '../components/Button'
import Field from './Field'
import formatDate from "../utils/formatDate"

const PostView = () => {
    //replace with api

    const [commentError, setCommentError] = useState(null)
    
    const location = useLocation()
    const postID = location.pathname.split("/")[2]
    const [post,setPost] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)
    const [newComment,setNewComment] = useState("")
    const [numComments, setNumComments] = useState(0)
    
    useEffect(()=>{
        
        axios.get("/api/post/postById/" + postID,{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            setPost(response.data.post)
            setIsLiked(response.data.post.hasLiked)
            setLikes(response.data.post.likes)
            setNumComments(response.data.post.comments.length)
        })
    },[postID,newComment])


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

    const liked = () => {
        return isLiked ? 'primary' : 'secondary'
    }

    //sends new comment
    const handleNewComment = (e) => {
        e.preventDefault()
        //TODO add to user's comments

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
                if (response.data.success){
                    setNewComment("")
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
                        <Link to ={"/profile/" + post.author.username}>
                            <img className='profilePic' src={post.author.profile_img} alt="profile" />
                        </Link>
                    </div>
                <Link to ={"/profile/" + post.author.username} style={{textDecoration: 'none'}}>
                    <div className='author'>{post.author.username}</div>
                </Link>
                <div className='dot'>•</div>
                <div className='date'>{formatDate(post.datePosted)}</div>
                <div className='pushRight'>
                    <ButtonTwoColor className={`button ${liked()}`} onClick={likeHandler} text={`${likes} ${likes === 1 ? 'like' : 'likes'}`} />
                </div>
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
                            <div>
                            <Link 
                                to ={"/profile/" + comment.author.username} 
                                style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                    {comment.author.username}
                            </Link>
                            </div>
                                <div>·</div>
                                <div className='date'>{formatDate(comment.datePosted)}</div>
                            </div>
                            <div>{comment.message}</div>
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
