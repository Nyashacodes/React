const express = require('express');
const router = express.Router()
const User = require('../models/User');


//create a user using post:endponit: POST "/api/auth/". Doesn't require authentication

router.post('/',(req,res)=>{   
    console.log(req.body);
    const user = User(req.body);
    user.save()
    res.send(res.body)
})


module.exports = router