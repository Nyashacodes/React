const express = require('express');
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


//create a user using post:endponit: POST "/api/auth/". Doesn't require authentication

router.post('/',
  [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ]
,(req,res)=>{   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user=>res.json(user));
  })


module.exports = router