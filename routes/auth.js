const router = require('express').Router(); // import express
const User = require('../models/User'); // import user model
const CryptoJS = require('crypto-js'); // import crypto-js
const jwt = require('jsonwebtoken'); // import jsonwebtoken


//REGİSTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,    // username
        email: req.body.email,  // req.body.email is the same as req.body.email
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PAS_SEC).toString(),   // encrypt password
    })  // create new user
    try{
        const savedUser = await newUser.save(); // save user
        res.status(201).json(savedUser);            // send user
    } catch(err){
        res.status(500).json({message: err});   // send error
    } 
});

//LOGIN

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username}); // find user

        if(!user){  // if user is not found
            return res.status(400).json({message: "User not found"}); // send error
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PAS_SEC); // decrypt password

        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8); // convert to string

        const {password,...others}  = user._doc; // others is the user data without password // Güvenlik için password olmadan kullanıcıyı aktardık ve ._doc ise mongodb datamızı document içinden gösteriyor
                                                    
        const accessToken = jwt.sign({ // create access token
            userId: user._id,   // user id  
            isAdmin: user.isAdmin   // isAdmin
        },
        process.env.JWT_SEC,    // secret key           
        {expiresIn: "3d"}   // expire time
        ); 

        if(Originalpassword !== req.body.password){ // if password is not correct
            return res.status(401).json({message: "Incorrect password"}); // send error
        } else{
            res.status(200).json({...others,accessToken}); // send success
        }
 
    }catch(err){    // if error
        res.status(500).json({message: err});   // send error
    }
});

module.exports = router; // export router