// const { getUser} = require('../service/auth');

// const restrictToLoggedinUserOnly = async (req, res, next) => {
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

const checkForAuthentication = (req, res, next) => {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie) return next();

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();

}

const restrictTo = (roles = []) => {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login');

        if (!roles.includes(req.user.role)) return res.end("Unauthorized");
        return next();
    };
}

// const restrictToLoggedinUserOnly = (req, res, next) => {
//     const userUid = req.headers["authorization"];

//     if (!userUid || !userUid.startsWith("Bearer ")) {
//         return res.redirect("/login");
//     }

//     const token = userUid.split("Bearer ")[1];
//     if (!token) {
//         return res.redirect("/login");
//     }

//     const user = getUser(token);
//     if (!user) {
//         return res.redirect('/login');
//     }

//     req.user = user;
//     next();
// };

// async function checkAuth(req, res, next) {
//     const userUid = req.headers["authorization"];

//     if (userUid && userUid.startsWith("Bearer ")) {
//         const token = authHeader.split("Bearer ")[1];
//         if (token) {
//             const user = getUser(token);
//             req.user = user;
//         }
//     }

//     next();
// }

module.exports = {
    checkForAuthentication,
    restrictTo,
    // restrictToLoggedinUserOnly,
    // checkAuth
};
