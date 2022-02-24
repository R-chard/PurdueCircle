import React from 'react'
import axios from "axios"

import { useHistory } from 'react-router-dom';

import '../styles/ConfirmDialog.css'

const Logout = (props) => {
    const { mainHandler, cancelHandler }  = props
    var { title, buttonText }  = props

    const history = useHistory()

    const confirmHandler = () => {
        mainHandler()

        console.log("delete account");
    }

    if (title === undefined) {
        title = 'Continue?'
    }

    if (buttonText === undefined) {
        buttonText = 'Confirm'
    }

    return (
        <div className='confirm popup'>
            <h3>{title}</h3>
            <div className='buttonContainer'>
                <button className='button alert' onClick={confirmHandler}>{buttonText}</button> 
                <button className='button cancel' onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    )
}

export default Logout