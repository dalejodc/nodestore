const jwt = require('jsonwebtoken');

//Middleware to check the token
let checkToken = (req, res, next)=>{
    
    let token = req.get('token');

    jwt.verify(token, process.env.TOKEN_SEED , (err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            })
        }

        req.user = decoded.user;

        next();
    });
}

module.exports = {
    checkToken
}