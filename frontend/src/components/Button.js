import React from 'react'
import { Link } from 'react-router-dom'

import Field from './Field'

import '../styles/Button.css'

/*
 * Usage: This component provides for 3 types of buttons: Links (changes Route), form submission (calls handler to submit a form),
 * and regular buttons.
 * 
 * All styles are found in Button.css and follows 3 formats, basic text link, 'primary' button (blue), and 'secondary' (gray)
 * Regular buttons can be primary or secondary depending on the className input, form submissions are always primary
 * 
 * Check below to see which props must be assigned to use each button & see Button.css for how className must be set
 */

const Button = (props) => {
    const {type, onClick, pathTo} = props
    var className = props.className
    var text = props.text

    if (text === undefined)
        text = 'DEFAULT BUTTON TEXT'
    
    if (className === undefined)
        className = 'button'

    if (pathTo !== undefined) {
        //a link requires there to be a pathTo to change the Route
        return <Link className={className} to={pathTo}>{text}</Link>
    } else if (type === 'formSubmit') {
        //form submission requires type to be 'submit'
        return <Field className={className} type={'submit'} value={text}/>
    } else {
        //anything else, className defines format of button
        return <button className={className} onClick={onClick}>{text}</button>
    }
} //Button

export default Button
