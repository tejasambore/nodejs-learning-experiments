const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 8000;

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

app.get('/users', (req, res) => {
    const html = `
       ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    `
    res.send(html);
})

app.get('/api/users', (req, res) => {
    console.log("I am in get route", req.myUsername)
    return res.json(users);
})

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) return res.status(404).json({ error: "user not found.."})
        return res.json(user);
    })
    .patch((req, res) => {
        // Edit the user with id
        return res.json({ status: "pending" });
    })
    .delete((req, res) => {
        // Delete the user with id
        return res.json({ status: "pending" });
    })

app.post('/api/users', (req, res) => {
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
})

app.patch('/api/users/:id', (req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending" });
})

app.delete('/api/users/:id', (req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending" });
})

app.listen(PORT, () => console.log(`Server srated at PORT:  ${PORT}` ))