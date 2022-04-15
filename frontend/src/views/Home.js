import React, { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"

import '../styles/Home.css'
import InlinePost from "../components/InlinePost"
import { Button, ButtonBlue, ButtonTwoColor } from '../components/Button'
import axios from "axios"
import { useRef } from "react"
import { useCallback } from "react"

const Home = () => {
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)


    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef()
    const lastElement = useCallback(element => {
        if (loading) return

        // if (!element) return

        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entires => {
            if (entires[0].isIntersecting && hasMore) {
                console.log('visible');
                setPage(page => page + 1)
            }
        })

        if (element) {
            observer.current.observe(element)
        }
        
        //REMOVE
        console.log('last', element)
    }, [loading, hasMore])


    useEffect(() => {
      setLoading(true)

      //TODO update this with pages
      axios.get("/api/post/fetchRecentPosts",{
        withCredentials: true, credentials:"include"
        })
        .then(response=>{
            console.log("home data", response.data.finalList)
            setLoading(false)

            setData(data => {
                console.log('DATA FOUND', data)
                // console.log('concated', data.posts.concat(response.data.finalList))

                if (data)
                    return { posts: data.posts.concat(response.data.finalList) }
                else
                    return { posts: response.data.finalList }
            })

            //remove this once backend returns pages
            if (page === 3) {
                setHasMore(false)
            }

            //this checks if there are more posts to send
            // setHasMore(response.data.finalList.length > 0)
        })
    
    }, [page])
    

    //remove this once backend can send pages
    // useEffect(() => {
    //     axios.get("/api/post/fetchRecentPosts",{
    //         withCredentials: true, credentials:"include"
    //     })
    //     .then(response=>{
    //         console.log("home data", response.data.finalList)
    //         setData({ posts: response.data.finalList })
    //     })
    // }, [])

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
        <div className="contents home" >
            <h1>PurdueCircle</h1>
            <div className="searchBar"><SearchBar /></div>

            <div className="container postView">
                {data && (data.posts.length === 0 ? <div>There are no posts to show </div> : (
                    data.posts.map((post, index) => {

                        if (data.posts.length === index + 1) {
                            return (
                            <div className={`inlinePost contents`} key={post._id} ref={lastElement}>
                                <InlinePost post={post}/>
                            </div>)
                        } else {
                            return (
                            <div className={`inlinePost contents`} key={post._id}>
                                <InlinePost post={post} />
                            </div>)
                        }
                    }))
                )}
                {loading ? <div className="loading">Loading...</div> : ''}
                <div className="footer">
                    {prevEnabled()}
                    <Button onClick={nextHandler} text='Next'/>
                </div>
            </div>
        </div>
    )
} //Home

export default Home