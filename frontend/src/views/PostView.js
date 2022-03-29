import React, { useState, useEffect } from 'react'
import axios from "axios"
import '../styles/PostView.css'
import { ButtonBlue, ButtonTwoColor } from '../components/Button'
import Field from '../components/Field'

const PostView = () => {
    //replace with api
        const comment1 = { author: "Jeff", date: new Date("2022-03-03T22:11:12.129+00:00"), id: 421432, message: "My name is Jeff"}
        const comment2 = { author: "A person", date: new Date("2022-02-30T22:11:12.129+00:00"), id: 91248057, message: "Beep boop"}
        const comment3 = { author: "Tim Apple", date: new Date("2022-01-13T22:11:12.129+00:00"), id: 6453141, message: "Good Morning!"}
        const comment4 = { author: "Moana", date: new Date("2022-01-31T22:11:12.129+00:00"), id: 9184537, message: "The ocean is calling me and I must go"}
        const comment5 = { author: "Joe", date: new Date("2022-02-17T22:11:12.129+00:00"), id: 3978514, message: "Who am I? What is existence but the affirmation by others that you exist? What is love?"}
        const comment6 = { author: "Jimothy", date: new Date("2022-03-23T22:11:12.129+00:00"), id: 340789541, message: "Comment sections amirite"}

        const objCommentsArray = [comment1, comment2, comment3, comment4, comment5, comment6]
        const objProfilePic = "https://imageio.forbes.com/specials-images/imageserve/5fe74d45a9c2a2d204db2948/0x0.jpg?format=jpg&width=1200&fit=bounds";
        const post = { author: { name: "jimothy", profilePic: objProfilePic }, postedAnon: false, message: `This is a post with some text that shows how a post with some text can be
        displayed`, likes: 4, datePosted: new Date("2022-02-24T22:11:12.129+00:00"), 
            comments: objCommentsArray, topics: ["posts", "society"], isLiked: false }
    //replace with api

    const profilePic = post.author.profilePic;
    const author = post.postedAnon ? "-----" : post.author.name
    const message = post.message
    const date = post.datePosted.toLocaleString('en-us', {month: 'long', day: 'numeric'})
    const commentsArray = post.comments

    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [likes, setLikes] = useState(post.likes)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)

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

    //sends new comment
    const handleNewComment = (e) => {
        e.preventDefault()
        //TODO add to user's comments
        //TODO sent to backend

        if (comment.length === 0) {
            setCommentError('Enter a comment')
        } else {
            console.log(comment)
        }
    }

    //for error message
    const hasError = (input) => {
        switch (input) {
            case 'commentField':
                if (commentError === 'Enter a comment') {
                    return 'fieldError'
                }
                break;
            default:
                break;
        }
    }

    //updates value
    const commentFieldHandler = (e) => {
        setComment(e.target.value)
        setCommentError(null)
    }

    return (
        <div className='container postView'>
            <div className='contents'>
                <UserInfo profilePic={profilePic} author={author} date={date} likes={likes} liked={liked} likeHandler={likeHandler}/>
                <p className='post'>
                    {message}
                </p>
                <CommentSection commentsArray={commentsArray} handleNewComment={handleNewComment} comment={comment} 
                    commentFieldHandler={commentFieldHandler} hasError={hasError} />
            </div>
        </div>
    )
} //PostView

const UserInfo = (props) => {
    const { profilePic, author, date, likes, likeHandler, liked } = props

    return (
        <div className='userInfo'>
            <div>
                <img className='profilePic'
                    src={profilePic}
                    alt="profile"
                />
            </div>
            <div className='author'>{author}</div>
            <div className='dot'>•</div>
            <div className='date'>{date}</div>
            <div className='pushRight'>
                <ButtonTwoColor className={`button ${liked()}`} onClick={likeHandler} text={`${likes} likes`} />
            </div>
        </div>
    )
} //UserInfo

const CommentSection = (props) => {
    const { commentsArray, handleNewComment, comment, commentFieldHandler, hasError } = props
    
    return (
        <div className='comments'>
            <ul>
                {commentsArray.map((currentComment) => {
                    return (
                        <div key={currentComment.id} className={'postComment'}>
                            <div className={'commentHeader'}>
                                <div>{currentComment.author}</div>
                                <div>·</div>
                                <div className='date'>{currentComment.date.toLocaleString('en-us', {month: 'long', day: 'numeric'})}</div>
                            </div>
                            <div>{currentComment.message}</div>
                        </div>
                    )
                })}
            </ul>
            <form className='newComment' onSubmit={handleNewComment}>
                <Field className={`multiLine ${hasError('commentField')} comment`} rows={3} value={comment} onChange={commentFieldHandler} placeholder={'Add a comment'} focus={false}/>
                <ButtonBlue type='formSubmit' text={'Reply'} />
            </form>
        </div>
    )
} //CommentSection

export default PostView
