import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

import '../styles/PostView.css'
import formatDate from '../utils/formatDate'

const InteractionView = (props) => {
    const { post } = props
    let { presetSize } = props

    // console.log("post: ", post);

    const authorName = post.postedAnon ? "Anonymous" : post.author.username
    const message = post.message
    const date = formatDate(post.datePosted)

    //if unspecified, uses preset size in PostView.css, otherwise uses that specified in another CSS
    if (presetSize === undefined) {
        presetSize = ' presetSize'
    } else {
        presetSize = ''
    }


    const renderUsername = () => {
        if (post.postedAnon) {
            return (
                <div className='author'>Anonymous</div>
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
        <div className={`contents${presetSize}`}>
            <div className='userInfo'>
                {renderUsername()}
            </div>
            <div>
                <Link 
                to={"/post/" + post._id}
                style={{ color: 'inherit', textDecoration: 'inherit'}} className='post'>
                    <p>
                    {message}
                    </p>
                </Link>
            </div>
        </div>
    )
} //PostView

export default InteractionView
