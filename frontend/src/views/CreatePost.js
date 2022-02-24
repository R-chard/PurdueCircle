import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import '../styles/CreatePost.css'

import Field from "../components/Field"
import Button from "../components/Button"

import redirectIfNotAuth from "../utils/redirectionIfNotAuth"

import axios from "axios"

const CreatePost = () => {
    //redirects to login of not logged in
    const history = useHistory()
    redirectIfNotAuth(history)

    const [post, setPost] = useState('')
    const [topic, setTopic] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [topicConfirm, setTopicConfirm] = useState(0)

    const sendPost = (e) => {
        e.preventDefault()
        if (post === ''){
            setErrorMessage('Enter some text')
            setTopicConfirm(0)
            return
        }

        if (topicConfirm < 1 && topic === '') {
            setTopicConfirm(topicConfirm + 1)
            setErrorMessage('No topic?')
            return
        }

        // format topics
        let topics = topic.split(",")
        for(let i =0; i < topics.length;i++){
            topics[i] = topics[i].trim()
        }
        topics = topics.filter(topic=>topic.length>0)
        
        axios.post("api/user/createPost",{
            text: post,
            topics
        },{withCredentials:true})
        .then(response=> {if(response.data.success){
            setErrorMessage('success')
            console.log('post successfully created');
            history.push('/')
            // alert("Post successfully created")
        }})
    }

    const postHandler = (e) => {
        setErrorMessage(null)
        setTopicConfirm(0)
        setPost(e.target.value)
    }

    const topicHandler = (e) => {
        setTopic(e.target.value)
    }

    let errorMod = ''
    if (errorMessage) {
        errorMod = 'fieldError'
    }
    
    return (
        <div className="contents createPost">
            <div className="formContainer">
                <form onSubmit={sendPost}>
                    <h1>Create post</h1>
                    {errorMessage ? <div className='message error'>{errorMessage}</div> : '' }
                    <label>Post content</label>
                    <Field className={`multiLine ${errorMod}`} value={post} onChange={postHandler} placeholder={'Enter some text'}/>
                    <label>Topic</label>
                    <Field className={'singleLine'} value={topic} onChange={topicHandler} placeholder={'Enter some text'}/>
                    <div className="buttonContainer">
                        <Button className={'formSubmit'} text={'Post'}/>
                    </div>
                </form>
            </div>
        </div>
    ) //return
} //CreatePost

export default CreatePost