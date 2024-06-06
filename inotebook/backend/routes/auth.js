const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Nyashaisawesome++";

//**************endpoint for creating user starts*************** */
//create a user using post:endponit: POST "/api/auth/createuser". Doesn't require authentication

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    //if there are errors, return the errors with Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exist already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      //generating and addin salt to password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //new user creation

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);
//**************endpoint for creating user finished*************** */



//**********************Authenticate using post:endponit: POST "/api/auth/login". no login required

router.post("/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").exists().withMessage("Password cannot be blanked"),
  ],async (req, res) => {
    //if there are errors, return bad request with error msg
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken})
    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
)

















module.exports = router;
