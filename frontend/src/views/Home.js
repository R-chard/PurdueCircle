import React, { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"

import '../styles/Home.css'
import InlinePost from "../components/InlinePost"

const Home = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        //replace with api
            const comment1 = { author: "Jeff", date: new Date("2022-03-03T22:11:12.129+00:00"), id: 421432, message: "My name is Jeff"}
            const comment2 = { author: "A person", date: new Date("2022-02-30T22:11:12.129+00:00"), id: 91248057, message: "Beep boop"}
            const comment3 = { author: "Tim Apple", date: new Date("2022-01-13T22:11:12.129+00:00"), id: 6453141, message: "Good Morning!"}
            const comment4 = { author: "Moana", date: new Date("2022-01-31T22:11:12.129+00:00"), id: 9184537, message: "The ocean is calling me and I must go"}
            const comment5 = { author: "Joe", date: new Date("2022-02-17T22:11:12.129+00:00"), id: 3978514, message: "Who am I? What is existence but the affirmation by others that you exist? What is love?"}
            const comment6 = { author: "Jimothy", date: new Date("2022-03-23T22:11:12.129+00:00"), id: 340789541, message: "Comment sections amirite"}

            const objCommentsArray1 = [comment1, comment2, comment5]
            const objCommentsArray2 = [comment3, comment4, comment5, comment6]

            const objProfilePic = "https://imageio.forbes.com/specials-images/imageserve/5fe74d45a9c2a2d204db2948/0x0.jpg?format=jpg&width=1200&fit=bounds";
            const post1 = { _id: 23451234312, author: { username: "jimothy", profile_img: objProfilePic }, postedAnon: false, message: `This is a post with some text that shows how a post with some text can be
            displayed`, likes: 4, datePosted: new Date("2022-02-24T22:11:12.129+00:00"), 
                comments: objCommentsArray1, topics: ["posts", "society"], isLiked: false }

            const post2 = { _id: 8973241613, author: { username: "dave", profile_img: objProfilePic }, postedAnon: false, message: `This is a very long post to show how
            a long post would be displayed. This message has been brought to you by Raid Shadow Legeneds. Raid: Shadow Legends is a mobile-fantasy 
            RPG game for mobile and PC developed by Plarium Games. The game takes place in Teleria, which has been subjugated by the Dark Lord 
            Siroth. The player goes through twelve levels in single player mode, with a multiplayer PVP mode deciding player rankings`, 
            likes: 10, datePosted: new Date("2022-03-05T22:11:12.129+00:00"), 
                comments: objCommentsArray2, topics: ["posts", "society"], isLiked: false }

            setData({ posts: [post1, post2, post2, post2] })
        //replace with api
    
    }, [])
    
    return (
        <div className="contents home">
            <h1>PurdueCircle</h1>
            <div className="searchBar"><SearchBar /></div>

            <div className="container postView">
                {data && (data.posts.length === 0 ? <div>There are no posts to show </div> : (
                    data.posts.map(post => (
                        <InlinePost key={post._id} post={post}/>
                    )))
                )}
            </div>
        </div>
    )
} //Home

export default Home