const Topic = require("../schemas/topics")
const User = require("../schemas/users")

const search = async (req,res,next) => {
    const QUERY_LIMIT = 5
    const query = req.params.query
    // Prioritize finding Users with the specified name
    let results = await User.find({"username": new RegExp(query)}).limit(QUERY_LIMIT)
    if (results.length < QUERY_LIMIT){
        diff = QUERY_LIMIT - results.length
        let foundTopics = await Topic.find({"title": new RegExp(query)}).limit(diff)
        results.push(...foundTopics)
    }

    res.status(200).json({results})
}

exports.search = search