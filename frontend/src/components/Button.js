import React from 'react'
import { Link } from 'react-router-dom'

import Field from './Field'

import '../styles/Button.css'

const Button = (props) => {
    const {type, onClick, pathTo} = props
    var className = props.className
    var text = props.text

    if (text === undefined)
        text = 'DEFAULT BUTTON TEXT'
    
    if (className === undefined)
        className = 'button'

    if (pathTo !== undefined) {
        return <Link className={className} to={pathTo}>{text}</Link>
    } else if (type === 'formSubmit') {
        return <Field className={className} type={'submit'} value={text}/>
    } else {
        return <button className={className} onClick={onClick}>{text}</button>
    }
} //Button

export default Button
