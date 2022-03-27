const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const userRoutes = require("./routes/user-routes")
const topicRoutes = require("./routes/topic-routes")
const postRoutes = require("./routes/post-routes")
const authRoutes = require("./routes/auth-routes")
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
require("dotenv").config()

const app = express()

app.use(express.static("../frontend/build"));
// Establish connection with database
mongoose.connect(process.env.DB_KEY, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  },
  () => {
    var status = mongoose.connection.readyState == 1 ? "connected" : "disconnected"
    console.log("Database is " + status)
  }
);

const store = new MongoDBSession({
  uri: process.env.DB_KEY,
  collection: "mySessions"
})

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json())

app.use(
  session({
    name: "id",
    secret: process.env.SESSION_KEY,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: "lax",
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

// PLACE ANY ENDPOINT YOU WANT TO DIRECT BELOW
app.use("/api/user",userRoutes)
app.use("/api/topic",topicRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)

app.listen(process.env.PORT || 3001, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use("/",()=>{
  const err = new Error("Route not found")
  err.status = 404
  throw err
})

// Error handling
app.use((err,req,res,next)=>{
  const status = err.statusCode || 500
  const message = err.message
  console.log(err.message)
  res.status(status).json({message})
})

