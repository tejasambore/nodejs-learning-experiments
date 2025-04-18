const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));

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
    return res.json(users);
})

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

app.route('/api/users/:id').get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
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
    users.push({ id: users.length + 1, ...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "pending", id: users.length });
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