const express = require('express'); // import express
const app = express();  // create an instance of express
const mongoose = require('mongoose'); // mongoose is a library that helps us connect to mongodb
const dotenv = require('dotenv'); // for .env file
const userRoute = require('./routes/user'); // import userRoute
const authRoute = require('./routes/auth'); // import authRoute
const bodyParser = require('body-parser');  // import body-parser




dotenv.config(); // load .env file

mongoose.connect(process.env.MONGO_URL) // connect to mongodb
.then(() => console.log('DB connected Successfully')).catch(err => console.log(err));

app.use(express.json()); // for parsing application/json   
app.use("/api/users", userRoute);   // /api/user  is the base url 
app.use("/api/auth", authRoute);   // /api/auth  is the base url
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.listen(process.env.PORT ||    5000, () => {
    console.log('Backend Server is running on port 5000');
}) // listen to port 5000
