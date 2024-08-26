const http = require("http");

const mongodb = require("mongodb")
let db;

const connectionString = "mongodb+srv://bakhodir2209:913686073m@cluster0.e30hwsa.mongodb.net/Order-Table"
mongodb.connect(connectionString,{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}, (err,client)=> {

    if(err) console.log("Error on connection MongoDB");
    else {
        console.log("MongoDB connection succed")
        module.exports = client;
        
        const app = require("./app")
        const server = http.createServer(app);
        let PORT = 3007;
        server.listen(PORT, function () {
          console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
        });  
    }
});