import React, { useEffect } from 'react'
import { useRef } from 'react'

import '../styles/Field.css'

import TextareaAutosize from '@mui/base/TextareaAutosize';

/*
 * The props are as follows
 * type: defines type of field (used to make password hide characters)
 * value: value that is displayed inside field & will be submitted
 * onChange: handler for changing value that is displayed
 * placeHolder: placeholder background text when field is empty
 * className: used for allowing custom selectors in CSS for different uses (optional, used for extra/custom CSS)
 * 
 * Prop requirements
 * For a password field, all props (^ except clasName, same for rest)
 * For regular text field, all props except type
 * For form submission button, use Button component
 */

const Field = (props) => {
    const {id, type, value, onChange, placeholder} = props
    let { rows, focus } = props
    var className = props.className

    const ref = useRef(null)

    if (focus === undefined)
        focus = true

    if (className === undefined)
        className = 'field'
    else
		className = 'field ' + className

    //sets focus on field if has error
    //CHECK add id & use to change which has focus
    useEffect(() => {
        if (ref.current && className.includes('fieldError')) {
            ref.current.focus()
        }
    })
    
    if (!rows) {
        rows = 10
    }

    if (className.includes('multiLine')) {
        if (className.includes('resize')) {
            return focus ? <TextareaAutosize minRows={rows} className={className} ref={ref} autoFocus value={value} onChange={onChange} placeholder={placeholder}/>
                : <TextareaAutosize minRows={rows} className={className} ref={ref} value={value} onChange={onChange} placeholder={placeholder}/>
        } else {
            return focus ? <textarea ref={ref} autoFocus className={className} value={value} onChange={onChange} placeholder={placeholder} rows={rows} cols={'50'}/>
                : <textarea ref={ref} className={className} value={value} onChange={onChange} placeholder={placeholder} rows={rows} cols={'50'}/>
        }
    } else {
        return <input ref={ref} className={className} id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}/>
    }
} //Field

export default Field