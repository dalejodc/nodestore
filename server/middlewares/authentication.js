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

//Middleware to check the ROLE
let checkRole = (req, res, next)=>{
    
    let user = req.user;
    
    if(user.ROLE === 'ADMIN_ROLE'){
        next();
    }else{
        return res.json({
            ok: false,
            err:{
                message: 'You are not allowed to do the action. Contact an Admin.'
            }
        })
    }
}

module.exports = {
    checkToken
}