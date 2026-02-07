const isAuthenticated = (req, res, next) => {
    console.log("Authenticating...");
    if (req.session.user === undefined){
        return res.status(401).json("Access Denied");
    }
    next();
};

module.exports = {isAuthenticated};