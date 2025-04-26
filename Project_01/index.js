const express = require('express');
const { connectDB } = require('./connection');
const userRouter = require('./routes/user');
const { logReqRes } = require('./middlewares/index');

const app = express();
const PORT = 8000;

// MongoDB Connection:
connectDB("mongodb://127.0.0.1:27017/youtube-app-1")
.then(() => console.log("MongoDB Connected..!"));

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes:
app.get("/", (req, res) => {
    res.send("Server running at 8000");
})

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT:  ${PORT}` ))