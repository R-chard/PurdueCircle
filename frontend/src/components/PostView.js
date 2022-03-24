import React, { useState } from 'react'

import '../styles/PostView.css'
import Button from './Button'
import Field from './Field'


const PostView = () => {
    const comment1 = { author: "Jeff", date: new Date("2022-03-03T22:11:12.129+00:00"), id: 421432, message: "My name is Jeff"}
    const comment2 = { author: "A person", date: new Date("2022-02-30T22:11:12.129+00:00"), id: 91248057, message: "Beep boop"}
    const comment3 = { author: "Tim Apple", date: new Date("2022-01-13T22:11:12.129+00:00"), id: 6453141, message: "Good Morning!"}
    const comment4 = { author: "Moana", date: new Date("2022-01-31T22:11:12.129+00:00"), id: 9184537, message: "The ocean is calling me and I must go"}
    const comment5 = { author: "Joe", date: new Date("2022-02-17T22:11:12.129+00:00"), id: 3978514, message: "Who am I? What is existence but the affirmation by others that you exist? What is love?"}
    const comment6 = { author: "Jimothy", date: new Date("2022-03-23T22:11:12.129+00:00"), id: 340789541, message: "Comment sections amirite"}


    const post = { author: "jimothy", isAnon: false, message: `This is a post with some text that shows how a post with some text can be
    displayed`, likes: 4, datePosted: new Date("2022-02-24T22:11:12.129+00:00"), 
        comments: [comment1, comment2, comment3], topics: ["posts", "society"], isLiked: false}

    const profilePic = "https://imageio.forbes.com/specials-images/imageserve/5fe74d45a9c2a2d204db2948/0x0.jpg?format=jpg&width=1200&fit=bounds";
    const author = post.isAnon ? "anonymous" : post.author
    const message = post.message
    const date = post.datePosted.toLocaleString('en-us', {month: 'long', day: 'numeric'})
    const commentsArray = [comment1, comment2, comment3, comment4, comment5, comment6]
    // const isLiked = post.isLiked


    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [likes, setLikes] = useState(post.likes)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)

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

        if (comment.length === 0) {
            setCommentError('Enter a comment')
        } else {
            console.log(comment)
        }
    }

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

    const commentFieldHandler = (e) => {
        setComment(e.target.value)
        setCommentError(null)
    }

    return (
        <div className='container postView'>
            <div className='contents'>
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
                    <div className='likeButton'>
                        <Button className={`button ${liked()}`} onClick={likeHandler} text={`${likes} likes`} />
                    </div>
                </div>
                <p className='post'>
                    {message}
                </p>
                <div className='comments'>
                    <form className='newComment' onSubmit={handleNewComment}>
                        <Field className={`multiLine ${hasError('commentField')} comment`} rows={3} value={comment} onChange={commentFieldHandler} placeholder={'Add a comment'} />
                        {/* <TextareaAutosize placeholder='Add a comment' className='field' onChange={(e) => setComment(e.target.value)} value={comment}/> */}
                        <Button className='formSubmit' text={'Reply'} />
                    </form>
                    <ul>
                        {commentsArray.map((currentComment) => {
                            return (
                                <div key={currentComment.id} className={'postComment'}>
                                    <div className={'commentHeader'}>
                                        <div>{currentComment.author}</div>
                                        <div>·</div>
                                        <div>{currentComment.date.toLocaleString('en-us', {month: 'long', day: 'numeric'})}</div>
                                    </div>
                                    <div>{currentComment.message}</div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
} //PostView

export default PostView
