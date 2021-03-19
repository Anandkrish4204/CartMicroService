const mongoose = require('mongoose');
const express = require('express');
const app = express();


app
.use(express.urlencoded())
.use(express.json());

app.use("/user",require("./routes"));


mongoose.connect('mongodb+srv://grocery-user:grocery-user-pass@cluster0.lkaxf.mongodb.net/GroceryCartDB?retryWrites=true&w=majority',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
 })
.then(result=>{    
    app.listen(process.env.PORT,()=>{
        console.log("Connected to MongoDB");
    });    
}).catch(err=>console.log(err));