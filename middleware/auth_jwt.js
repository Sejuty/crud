const jwt = require("jsonwebtoken");
const User = require("../models/User");


module.exports = (req, res,next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    console.log("user",token)
   
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedToken);
        const email = decodedToken.email;
        console.log("decoded",email);
        if (!email) {
            return res.status(401).json({message: 'No email!'});
        }
        const user = User.findOne({where: {Email: email}});
        req.id = user.id;
        req.Email = email;
    
    } catch (error) {
        return res.status(401).json({message: 'You are not token authorized!',
        error: error});
    }
    next();
  };
  // ========