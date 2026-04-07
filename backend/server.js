const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todo-list")
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB",err);
    });



app.listen(port, () => {
    console.log(`Le serveur est lancé sur le port ${port}`);
});