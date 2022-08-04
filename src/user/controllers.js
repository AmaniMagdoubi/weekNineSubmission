const jwt = require("jsonwebtoken"); 
const User = require("./model"); 

// request and response 
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        //create token with user._id inside
        //generate token using newUser._id
        const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET); 
        //send success message and token back in the response
        res.send({ msg: "This came from createUser", token }); 
    } catch (error) {
        console.log(error); 
        res.send({ err: error }); 
    }
}; 

exports.login = async (req, res) => {
    try {
        //create token with user._id inside
        const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET); 
        res.send({ user: req.user.username, token }); 
    } catch (error) {
        console.log(error); 
        res.send({ err: error }); 
    }
}; 

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}); 
        const result = users.map((u) => {
            return u.username;
        }); 
        res.send({ allUsers: result }); 
    } catch (error) {
        console.log(error); 
        res.send({ err: error }); 
    }
}; 

exports.updatePass = async (req, res) => {
    try {
        await User.updateOne({ username: req.body.username }, { password: req.body.password });
        // sending a success message response 
        res.send({ msg: "Successfully updated" })
    } catch (error) {
        console.log(error);
        // sending error as a response 
        res.send({ err: error });
    };
};

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ username:req.body.username }); 
        // sending a success message response 
        res.send({ msg: "Successfully deleted" })
    } catch (error) {
        console.log(error); 
        // sending error as a response 
        res.send({ err: error })
    };
};

