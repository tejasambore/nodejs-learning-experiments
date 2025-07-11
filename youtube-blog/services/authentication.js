const JWT = require("jsonwebtoken");

const secret = "$uperMan@123";

function createTokenForUser(user) {
    console.log(user);
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    };

    const token = JWT.sign(payload, secret);
    console.log(token);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}