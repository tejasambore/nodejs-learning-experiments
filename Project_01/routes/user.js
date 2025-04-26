const express = require('express');
const router = express.Router();

const { 
    handleGetAllUsers, 
    handleGetUserById, 
    handleUpdateUserById, 
    handleDeleteUserById,
    handleCreateNewUser
} = require('../controllers/user');


// router.get('/users',  async(req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.lastName}</li>`).join("")}
//     `
//     res.send(html);
// })

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

router.post('/', handleCreateNewUser);

router.patch('/:id', (req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending" });
})

router.delete('/:id', (req, res) => {
    // TODO: Edit the user with id
    return res.json({ status: "pending" });
})

module.exports = router;