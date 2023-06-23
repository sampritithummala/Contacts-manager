//console.log("I am in the express project");
const express = require("express");
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
const port = process.env.PORT || 5000;



//const port = 5000;

/*app.get('/api/contacts',(req,res)=>{
    res.status(200).json("Get all contacts");
})*/

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
} );

