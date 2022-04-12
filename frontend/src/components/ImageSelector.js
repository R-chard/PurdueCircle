import React,{useState} from "react"
import "../styles/ImageSelector.css"
import axios from "axios"

const ImageSelector = (props) => {
    const [picURL,setPicURL] = useState(props.profPic)
    const [selectedFile, setSelectedFile] = useState(null)
    const fileSelectedHandler = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2){
                setPicURL(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
        setSelectedFile(e.target.files[0])
    }

    const fileUploadHandler = e => {
        e.preventDefault();
        if (!selectedFile){
            alert("Please select a file first")
            return
        }
        let fd = new FormData()
        fd.append("image",selectedFile)
        axios("/api/user/upload",{
            data:fd,
            method:"patch",
            withCredentials:true,
            headers:{"Content-Type":"multipart/form-data","boundary":fd.boundary}})
    }

    return(
        <div className="image-selector-component">
            <input className = "image-selector-uploader" type="file" onChange={fileSelectedHandler} />
            <button onClick={fileUploadHandler}>Upload</button>
        </div>
    )
}
export default ImageSelector