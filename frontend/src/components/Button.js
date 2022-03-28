import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

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

const ButtonTemplate = (props) => {
    const {onClick, pathTo} = props
    let className = props.className
    // let text = props.text
    let { text, type } = props

    if (text === undefined)
        text = 'DEFAULT BUTTON TEXT'
    
    if (className === undefined)
        className = 'button'

    //types: fieldSubmit, regular, link
    if (type === undefined) {
        type = 'regular'
    }

    if (text === undefined) {
        text = 'DEFAULT BUTTON TEXT'
    }

    if (type === 'link') {
        //a link requires there to be a pathTo to change the Route
        return <RouterLink className={className} to={pathTo}>{text}</RouterLink>
    } else if (type === 'formSubmit') {
        //form submission requires type to be 'submit'
        return <Field className={`${className} formSubmit`} type={'submit'} value={text}/>
    } else {
        //anything else, className defines format of button
        return <button className={className} onClick={onClick}>{text}</button>
    }
} //Button


const ButtonBlue = (props) => {
    const { pathTo, onClick } = props
    let { type, className, text } = props

    if (className === undefined) {
        className = 'button primary'
    } else {
        className += ' button primary'
    }

    return <ButtonTemplate pathTo={pathTo} onClick={onClick} type={type} className={className} text={text}/>
} //PrimaryButton


const Button = (props) => {
    const { pathTo, onClick } = props
    let { type, className, text } = props

    if (className === undefined) {
        className = 'button secondary'
    } else {
        className += ' button secondary'
    }

    return <ButtonTemplate pathTo={pathTo} onClick={onClick} type={type} className={className} text={text}/>
} //PrimaryButton

const ButtonTwoColor = (props) => {
    const { pathTo, onClick } = props
    let { type, className, text } = props

    if (className === undefined) {
        className = 'button secondary'
    } else {
        className += ' button'
    }

    return <ButtonTemplate pathTo={pathTo} onClick={onClick} type={type} className={className} text={text}/>
} //PrimaryButton


const ButtonLink = (props) => {
    const { pathTo, onClick } = props
    let { className, text } = props

    const type = 'link'

    if (className === undefined) {
        className = 'button link'
    } else {
        className += ' button link'
    }

    return <ButtonTemplate pathTo={pathTo} onClick={onClick} type={type} className={className} text={text}/>
} //PrimaryButton

export { ButtonBlue, Button, ButtonTwoColor, ButtonLink }

export default Button
