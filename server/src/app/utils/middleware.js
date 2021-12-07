var { verifyAndDecode } = require('./jwt')

module.exports = {
    jwtDecode: (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const userData = verifyAndDecode(token)
            req.userData = userData
            next();
        } catch (err) {
            console.log('err: ', err)
            res.status(401).send("Invalid Bearer Token")
        }
    },
    checkPermission: arr => ((req, res, next) => {
        try {
            const { adminAccess } = req.userData
            if (!arr.includes(adminAccess)) {
                throw "Invalid Permission";
            }
            next();
        } catch (err) {
            res.status(401).send(err);
        }
    })
};