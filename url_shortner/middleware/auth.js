// const { getUser} = require('../service/auth');

// const restrictToLoggedinUserOnly = (req, res, next) => {
//     const userUid = req.headers["authorization"];

//     if (!userUid) res.redirect("/login");
//     const token = userUid.split("Bearer ")[1];
//     const user = getUser(token);

//     if (!user) return res.redirect('/login');

//     req.user = user;
//     next();
// }

// const checkAuth = async (req, res, next) => {
//     const userUid = req.headers["authorization"];
//     const token = userUid.split("Bearer ")[1];

//     const user = getUser(token);

//     req.user = user;
//     next();
// }

// module.exports = {
//     restrictToLoggedinUserOnly,
//     checkAuth,
// }


const { getUser } = require('../service/auth');

const restrictToLoggedinUserOnly = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.redirect("/login");
    }

    const token = authHeader.split("Bearer ")[1];
    if (!token) {
        return res.redirect("/login");
    }

    const user = getUser(token);
    if (!user) {
        return res.redirect('/login');
    }

    req.user = user;
    next();
};

async function checkAuth(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split("Bearer ")[1];
        if (token) {
            const user = getUser(token);
            req.user = user;
        }
    }

    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};
