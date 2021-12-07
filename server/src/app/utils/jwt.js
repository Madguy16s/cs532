'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    generateAccessToken: ({ id, email, adminAccess }) => {
        return jwt.sign(
            {
                id: id,
                email: email,
                adminAccess: adminAccess,
            },
            process.env.TOKEN_SECRET,

        );
    },
    verifyAndDecode: (token) => jwt.verify(token, process.env.TOKEN_SECRET)
}