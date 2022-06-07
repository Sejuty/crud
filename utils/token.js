const jwt = require("jsonwebtoken");

exports.generateToken = async (user) => {
    return await jwt.sign(
        {
            email: user.Email,
            name: user.Name
        },
        process.env.SECRET_KEY
    );
};