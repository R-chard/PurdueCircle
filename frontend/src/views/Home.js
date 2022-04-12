import React, { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"

import '../styles/Home.css'
import InlinePost from "../components/InlinePost"
import { Button, ButtonBlue, ButtonTwoColor } from '../components/Button'
import axios from "axios"

const Home = () => {
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios.get("/api/post/fetchRecentPosts",{
            withCredentials: true, credentials:"include"
        })
        .then(response=>{
            console.log("home data", response.data.finalList)
            setData({ posts: response.data.finalList })
        })
    }, [])

    const prevHandler = () => {
        console.log('prev')
        setPage(page - 1)
    }

    const nextHandler = () => {
        console.log('next')
        setPage(page + 1)
    }

    //disables previous button if at start
    const prevEnabled = () => {
        if (page === 1) {
                return <Button text='Previous' className={'disabled'}/>
        } else {
            return <Button onClick={prevHandler} text='Previous'/>
        }
    }
    
    return (
        <div className="contents home">
            <h1>PurdueCircle</h1>
            <div className="searchBar"><SearchBar /></div>

            <div className="container postView">
                {data && (data.posts.length === 0 ? <div>There are no posts to show </div> : (
                    data.posts.map(post => (
                        <InlinePost key={post._id} post={post} presetSize={false}/>
                    )))
                )}
                <div className="footer">
                    {prevEnabled()}
                    <Button onClick={nextHandler} text='Next'/>
                </div>
            </div>
        </div>
    )
} //Home

export default Home