const User = require("../models/user");

const handleGetAllUsers = async  (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

const  handleGetUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found.."})
    return res.json(user);
}

const handleUpdateUserById = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    return res.json({ status: "success" });
}

const handleDeleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
}

const handleCreateNewUser = async (req, res) => {
    const body = req.body;
    if ( !body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ) {
        return res.status(400).json({ error: "Please provide all the fields" });
    }
     
    // users.push({ id: users.length + 1, ...body});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: "success", id: users.length });
    // })

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    // console.log("result", result);
    return res.status(201).json({ status: "User Created Successfully!!", id: result._id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}