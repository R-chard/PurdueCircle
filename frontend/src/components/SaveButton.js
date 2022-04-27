import React,{useState} from "react"
import axios from "axios"

const SaveButton = (props)=>{

    const [isSaved, setIsSaved] = useState(props.isSaved)

    const savedHandler = () => {
        if (isSaved) {
            setIsSaved(false)
            axios.post("/api/post/unsave",{
                postID:props.postID,
            },{
                withCredentials: true, credentials:"include"
            })
        } else {
            setIsSaved(true)
            axios.post("/api/post/save",{
                postID:props.postID,
            },{
                withCredentials: true, credentials:"include"
            })
        }
    }

    return (
        <button onClick={savedHandler} className='save button' title='save post' data-testid="test-save-button">
            <svg className={`save-svg ${isSaved ? 'primary':''}`} data-testid="test-save-svg">
                <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21"></polygon>
            </svg>
        </button>
    )
}

export default SaveButton