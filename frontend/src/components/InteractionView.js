import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

import '../styles/PostView.css'
import formatDate from '../utils/formatDate'
import InlinePost from './InlinePost'

const InteractionView = (props) => {
    const { post } = props
    const { username } = props;
    const { interaction } = props;
    let { presetSize } = props

    // console.log("post: ", post);

    const authorName = username

    //if unspecified, uses preset size in PostView.css, otherwise uses that specified in another CSS
    if (presetSize === undefined) {
        presetSize = ' presetSize'
    } else {
        presetSize = ''
    }


    const renderUsername = () => {
        return (
            <Link to ={"/profile/" + authorName} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className='author'>{authorName}</div>
                <div>{interaction.interactionType == "like" ? "Liked" : "Commented on"}</div>
            </Link>
        )
    }

    return (
        <div className={`interaction contents${presetSize}`}>
            <div className='interaction userInfo'>
                {renderUsername()}
            </div>
            <div className='container postView'>
                <InlinePost key={post._id} post={post}/>
            </div>
        </div>
    )
} //PostView

export default InteractionView
