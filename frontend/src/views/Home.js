import React, { useEffect, useState, useRef,useCallback } from "react"
import SearchBar from "../components/SearchBar"

import '../styles/Home.css'
import InlinePost from "../components/InlinePost"
import axios from "axios"

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
        
    }, [loading, hasMore])


    useEffect(() => {
        console.log("page is ",page)
      setLoading(true)

      axios.get("/api/post/fetchRecentPosts/" + page.toString(),{
        withCredentials: true, credentials:"include"
        })
        .then(response=>{
            console.log("home data", response.data.finalList)
            setLoading(false)
            if(response.data.finalList.length == 0){
                setHasMore(false)
            }
            setData(data => {
                console.log('DATA FOUND', data)
                // console.log('concated', data.posts.concat(response.data.finalList))

                if (data)
                    return { posts: data.posts.concat(response.data.finalList) }
                else
                    return { posts: response.data.finalList }
            })

        })
    
    }, [page])
    
    
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
            </div>
        </div>
    )
} //Home

export default Home