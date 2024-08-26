console.log("Starting Web Server");
const express = require("express");
const app = express();



//MongoDB
const db = require("./server").db();
const mongodb = require("mongodb")

//  Introduction code

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routing code

module.exports