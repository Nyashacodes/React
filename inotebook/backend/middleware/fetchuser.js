const jwt = require("jsonwebtoken");
const JWT_SECRET = "Nyashaisawesome++";

const fetchuser = (req, res, next)=>{
    //Get the user from the jwt token and add id to request object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please aurthenticate using a valid token"})
    }
    try{

    }catch(error){
        res.status(401).send({error:"Please aurthenticate using a valid token"})
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
}



module.exports = fetchuser;
