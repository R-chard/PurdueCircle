const Post = require("../schemas/posts")
const Topic = require("../schemas/topics")
const User = require("../schemas/users")

const create = async (req, res, next) => {
    const userID = req.session.userID;
    const {topics, text, postedAnon} = req.body;

    try {
        let currUser = await User.findById(userID);

        // check that user exists
        if (!currUser) {
            res.status(404).json({success: false});
            return;
        }

        // create new post
        let newPost = new Post({
            author: currUser,
            datePosted: new Date(),
            message: text,
            postedAnon,
            topicNames: topics,
            comments: [],
            likes: 0,
            usersLiked: []
        });

        // save posts and user
        await newPost.save()
        currUser.posts.push(newPost)
        await currUser.save()
        
        // iterate all topics
        for (let topic of topics){
            let currTopic = await Topic.findOne({ title: topic});
            // create and save new topic
            if (!currTopic) {
                const newTopic = new Topic({
                    title:topic,
                    posts:[newPost]
                })
                await newTopic.save()
            
            // add post to existing topic
            } else{
                currTopic.posts.push(newPost)
                await currTopic.save()
            }
        };
        
    } catch (error) {
        return next(error);
    }
    res.status(200).json({success:true});
    
}

exports.create = create