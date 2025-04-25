const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

// MongoDB Connection:
mongoose
    .connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("Mongo Error:", err));

// Schema:
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, },
    email: { type: String, require: true, unique: true, },
    gender: { type: String, },
    jobTitle: { type: String, },
}, {timestamps: true});

// Model:
const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from Middleware.. 1");
    req.myUsername = "piyushgarg.dev"
    // return res.json("Hello from Middleware.. 1");
    next();
})

app.use((req, res, next) => {
    console.log("Hello from Middleware.. 2", req.myUsername);
    // return res.end("Hey");
    next();
})

// Routes:
app.get("/", (req, res) => {

    res.send("Server running at 8000");
})

app.get('/users',  async(req, res) => {
    const allDbUsers = await User.find({});
    const html = `
       ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.lastName}</li>`).join("")}
    `
    res.send(html);
})

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    // console.log("I am in get route", req.myUsername)
    return res.json(allDbUsers);
})

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

app.route('/api/users/:id')
    .get( async (req, res) => {
        // const id = Number(req.params.id);
        // const user = users.find((user) => user.id === id);

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "user not found.."})
        return res.json(user);
    })
    .patch( async (req, res) => {
        // Edit the user with id
        await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
        return res.json({ status: "success" });
    })
    .delete( async (req, res) => {
        // Delete the user with id
        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "success" });
    })

app.post('/api/users', async (req, res) => {
    // TODO: Create new user
    const body = req.body;
    // console.log("Body", body)
    if (
        !body || 
        !body.first_name || 
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ error: "Please provide all the fields" });
    }
    users.push({ id: users.length + 1, ...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: "success", id: users.length });
    })

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    // console.log("result", result);

    return res.status(201).json({ status: "sucess, user created", id: result._id });
});

app.patch('/api/users/:id', (req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending" });
})

app.delete('/api/users/:id', (req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending" });
})

app.listen(PORT, () => console.log(`Server started at PORT:  ${PORT}` ))