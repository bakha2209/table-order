const dotenv = require("dotenv");
dotenv.config();
const Menu=require("./schema/menuSchema")


const http = require("http");
const mongoose = require("mongoose")


const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString,{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}, (err,goose)=> {

    if(err) console.log("Error on connection MongoDB");
    else {
        console.log("MongoDB connection succeed")
        
        
        const app = require("./app")
        const server = http.createServer(app);
        let PORT = process.env.PORT || 3005;
        server.listen(PORT, function () {
          console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
        });  
    }
});

const seedMenu = async () => {
  const sampleMenus = [
    { name: "Burger", description: "A juicy burger with cheese and lettuce", price: 5.99 },
    { name: "Pizza", description: "A large pizza with pepperoni and cheese", price: 12.99 },
    { name: "Salad", description: "A healthy green salad with vinaigrette", price: 7.99 },
  ];

  try {
    await Menu.insertMany(sampleMenus);
    console.log('Sample menu items inserted');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};
//seedMenu();