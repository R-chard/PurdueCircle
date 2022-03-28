import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import '../styles/CreatePost.css'

import Field from "../components/Field"
import Button from "../components/Button"
import { ButtonBlue } from '../components/Button'

import axios from "axios"

const CreatePost = () => {
    //redirects to login of not logged in
    const history = useHistory()

    const [post, setPost] = useState('')
    const [topic, setTopic] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [topicConfirm, setTopicConfirm] = useState(0)
    const [postedAnon, setPostedAnon] = useState(false)

    //setState is not instantaneous so this accomodates by checking length after state is updated
    useEffect(() => {
        if (post.length > 400 && post.length <= 500) {
            const num = 500 - post.length
            const plural = Math.abs(num) === 1 ? '' : 's'
            setErrorMessage({field: 'post', type: 'warning', message: `${num} character${plural} left`})
        } else if (post.length > 500) {
            const num = post.length - 500
            const plural = Math.abs(num) === 1 ? '' : 's'
            setErrorMessage({field: 'post', type: 'messageError', message: `${num} character${plural} extra`})
        } else {
            setErrorMessage(null)
        }
    }, [post])

    const sendPost = (e) => {
        e.preventDefault()
        if (post === ''){
            setErrorMessage({ field: 'post', type: 'error', message: 'Enter some text for the post' } )
            setTopicConfirm(0)
            return
        }

        if (post.length > 500) {
            setErrorMessage({ field: 'post', type: 'error', message: 'Posts cannot exceed 500 characters' })
            setTopicConfirm(0)
            return
        }

        if (topicConfirm < 1 && topic === '') {
            setTopicConfirm(topicConfirm + 1)
            setErrorMessage({ field: 'topic', type: 'warning', message: 'No topic?' })
            return
        }

        // format topics
        let topics = topic.split(",")
        for(let i =0; i < topics.length;i++){
            topics[i] = topics[i].trim()
        }
        topics = topics.filter(topic=>topic.length>0)
        
        axios.post("api/post/create",{
            text: post,
            topics,
            postedAnon,
        },{withCredentials:true})
        .then(response=> {if(response.data.success){
            history.push('/')
            // alert("Post successfully created")
        }})
    } //sendPost

    const postHandler = (e) => {
        setPost(e.target.value)
        setTopicConfirm(0)
        setErrorMessage({...errorMessage, field: ''})
    }

    const topicHandler = (e) => {
        setTopic(e.target.value)
        setErrorMessage({...errorMessage, field: ''})
    }

    const hasError = (input) => {
        if (errorMessage && errorMessage.field === input){
            if (errorMessage.type === 'warning' || errorMessage.type === 'messageError')
                return 'fieldWarning'
            else if (errorMessage.type === 'error')
                return 'fieldError'
            else
                return ''
        } else {
            return ''
        }
    } //hasError()

    const checkSwitchHandler = (e) =>{
        setPostedAnon(!postedAnon)
    }
    
    return (
        <div className="contents createPost">
            <div className="formContainer bgBase">
                <form onSubmit={sendPost}>
                    <h1>Create post</h1>
                    {errorMessage ? <div className={`message ${errorMessage.type}`}>{errorMessage.message}</div> : '' }
                    <label>Post content</label>
                    <Field className={`multiLine ${hasError('post')}`} value={post} onChange={postHandler} placeholder={'Enter some text'}/>
                    <label>Topic</label>
                    <Field className={`singleLine ${hasError('topic')}`} value={topic} onChange={topicHandler} placeholder={'Enter some text'}/>
                    <div className = "anonymous-toggle">
                        <Switch onChange={checkSwitchHandler}/>
                        <div className = "anonymouse-toggle-label">Post anonymously</div>
                    </div>
                    
                    <div className="buttonContainer">
                        <ButtonBlue type={'formSubmit'} text={'Post'}/>
                    </div>
                </form>
            </div>
        </div>
    ) //return
} //CreatePost

export default CreatePost