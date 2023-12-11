const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const DatabaseSingleton = require("./utils/dbConnection");
const session = require('express-session')
const store = new session.MemoryStore();

const Users = require("./models/users")

// routes
const questionRoute = require("./routes/questions");
const answerRoute = require("./routes/answers");
const tagsRoute = require("./routes/tags");
const userRoute = require("./routes/users");
const profileRoute = require("./routes/profile");
const commentsRoute = require("./routes/comments");

// ========== MIDDLEWARE ==========
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    resave: false
}))

// ========= ENV VARIABLES =========
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/fake_so";

// ========= Connecting to MongoDb database =========
const databaseInstance = new DatabaseSingleton(MONGO_URL);

// ========= ROUTES ==============
app.use("/questions", questionRoute);
app.use("/answers", answerRoute);
app.use("/tags", tagsRoute);
app.use("/user", userRoute);
app.use("/", profileRoute);
app.use("/", commentsRoute);

// Handle server termination
const server = app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});

// async function func() {
//     await Users.updateOne({ _id:"b2d9d6cc-0c9a-4143-9489-39e3709df55a" },{$set: {reputation: 70}});
// } 
// func()

// Handle server termination
process.on("SIGINT", () => {
    server.close(() => {
        // Disconnect from MongoDB before exiting
        databaseInstance.disconnect();
    });
});
