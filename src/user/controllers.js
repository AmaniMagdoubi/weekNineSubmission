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
        // await User.updateOne({ username: req.body.username }, { password: req.body.password });

        if (req.body.username) {
            const user = await User.findOne({ username: req.body.username }); 
            let oldName = req.body.username; 
            let newName = req.body.newUsername; 
            console.log(`Changing ${ oldName } to ${ newName }`)
            await User.updateOne({ username: user.username }, { $set: { username: req.body.newUsername }}); 
            res.send({ msg: "Username Updated" });
        }

        else if (req.body.newEmail) {
            const user = await User.findOne({ email:req.body.email })
            let oldEmail = req.body.email
            let newEmail = req.body.newEmail
            console.log(`Changing ${ oldEmail } to ${ newEmail }`)
            await User.updateOne({ email: user.email }, { $set: { email: req.body.newEmail }}); 
            res.send({ msg: "E-mail Updated"})
        } 

        else if (req.body.newPassword) {
            const user = await User.findOne({ username: req.body.username })
            let oldPass = req.body.password 
            let newPass = req.body.newPassword
            console.log(`Changing ${ oldPass } to ${ newPass }`)
            //TODO Check Pass in Body is same as hashed pass in DB
            //TODO Hash new pass and replace old one
            await User.updateOne({ password: user.password }, { $set: { password: req.body.newPassword }})
            res.send({ msg: "Password Updated" })
        } else {
            console.log("Error: Else command reached")
            res.send({ msg: "Else Command" })
        }

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

