//This Run's database connection immediately
require("./db/connection"); 

const express = require("express"); 
const userRouter = require("./user/routes"); 
const app = express(); 

//Add relevant routes and controllers to app before listen runs
//Tell entire server that it will always recieve JSON, and to always send back JSON
app.use(express.json()); 
app.use(userRouter); 

//App listening to Port 5001 
app.listen(5001, () => {
    console.log("Listening on port 5001"); 
}); 
