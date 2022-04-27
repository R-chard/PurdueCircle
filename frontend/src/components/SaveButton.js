import React from "react"

const SaveButton = (props)=>{

    return (
        <button onClick={props.savedHandler} className='save button' title='save post' data-testid="test-save-button">
            <svg className={`save-svg ${props.isSaved ? 'primary':''}`} data-testid="test-save-svg">
                <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21"></polygon>
            </svg>
        </button>
    )
}

export default SaveButton