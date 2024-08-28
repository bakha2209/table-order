console.log("Starting Web Server");
const express = require("express");
const app = express();
const router = require("./router");
const cookieParser = require("cookie-parser")



//  Introduction code

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

//Routing code
app.use("/", router)
module.exports=app