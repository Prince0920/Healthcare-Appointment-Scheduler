const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require('path');
//const cors = require("cors");

//res object
const app = express();

//config .env
dotenv.config();

//import db
connectDB();

//use cors
//app.use(cors());

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
// app.get("/", (req, res) => {
//   res.status(200).send({
//     message: "server is running",
//   });
// });

// app.post("/api/v1/user/register", (req, res) => {
//   res.send("working ...........");
// });

const userRoutes = require("./routes/userRoutes");

app.use("/api/v1/user", userRoutes);



//static files 

app.use(express.static(path.join(__dirname,'./client/build')))

app.get("*",function(req,res){

  res.sendFile(path.join(__dirname,"./client/build/index.html"))
 
});


//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `server is running ${process.env.DEV_MODE} mode on port ${port}`
  );
});
