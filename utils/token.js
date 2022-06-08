const jwt = require("jsonwebtoken");

exports.generateToken = async (user) => {
    return await jwt.sign(
        {
            id: user.id,
            email: user.Email,
            name: user.Name
        },
        process.env.SECRET_KEY
    );
};