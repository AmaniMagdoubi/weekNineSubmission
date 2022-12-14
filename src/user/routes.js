const { Router } = require("express"); 
const userRouter = Router(); 
const { createUser, login, getAllUsers, updatePass, deleteUser } = require("./controllers"); 
const { hashPass, comparePass, tokenCheck } = require("../middleware"); 

userRouter.post("/user", hashPass, createUser); 
userRouter.post("/login", comparePass, login); 
userRouter.get("/user", getAllUsers); 
userRouter.get("/login", tokenCheck, login); 
userRouter.patch("/user", hashPass, updatePass); 
userRouter.delete("/user", deleteUser); 

//generate a token on createUser and login, token should include unique info from db entry, token should be in response
//have an endpoint that finds a user in the db, using the id from token

module.exports = userRouter; 

