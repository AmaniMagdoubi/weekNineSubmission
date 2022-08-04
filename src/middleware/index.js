const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const User = require("../user/model"); 

exports.hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8); 
        next(); 
        //Take a password out of the body, hash that password with bcrypt, and then put it back in the body

    } catch (error) {
        console.log(error); 
        res.send({ err: error }); 
    }
}; 

exports.comparePass = async (req, res, next) => {
    try {
        console.log("This is comparePass"); 
        req.user = await User.findOne({ username: req.body.username }); 

        //find user in database, compare password from body with password from db with bcrypt
        //if successful pass user to controller through req, if unsuccessful send error
        
        if (
            req.user && (await bcrypt.compare(req.body.password, req.body.password))
        ) {
            next(); 
        } else {
            throw new Error({ msg: "Incorrect credentials" }); 
        }
    } catch (error) {
        console.log(error); 
        res.send({ err: error }); 
    }
}; 

exports.tokenCheck = async (req, res, next) => {
    try {
        //get the token from req, unlock the token, find the user with the id in the token, send the user to a controller
        console.log("This is tockenCheck"); 
        const token = req.header("Authorization"); 
        const decodedToken = await jwt.verify(token, process.env.SECRET); 
        const user = await User.findById(decodedToken._id); 
        req.user = user; 
        next(); 
        
    } catch (error) {
        console.log(error); 
        res.status(418).send({ err:error }); 
    }
}; 




