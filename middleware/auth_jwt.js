const jwt = require("jsonwebtoken");
const User = require("../models/User");


const jwt_auth = (req, res,next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const email = decodedToken.email;
        const id = decodedToken.id;
        req.id = id;
        req.email = email;
        next();
    } catch (error) {
        return res.status(401).json({message: 'You are not authorized!',
        error: error});
    }
   
  };

  module.exports = jwt_auth;
  // ========