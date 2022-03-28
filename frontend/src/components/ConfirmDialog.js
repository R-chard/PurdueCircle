import React from 'react'

import '../styles/ConfirmDialog.css'
import { Button } from '../components/Button'

const ConfirmDialog = (props) => {
    const { mainHandler, cancelHandler }  = props
    var { title, buttonText }  = props

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
                <Button className='alert' onClick={confirmHandler} text={buttonText} /> 
                <Button className='cancel' onClick={cancelHandler} text='Cancel' />
            </div>
        </div>
    )
}

export default ConfirmDialog