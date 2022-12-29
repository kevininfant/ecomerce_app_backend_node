const express = require('express');
const mongoose = require('mongoose');
// file import
const authRouter = require('./Route/auth.js');

const DB = "mongodb://localhost:27017/amazon_clone";


const app = express ();

const PORT = 3000;

// middleware
app.use(express.json())
app.use(authRouter);

// connections

mongoose.connect(DB)
.then(()=>{
    console.log('connection Successful')
}).catch(e =>{
    console.log(e);
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`connect at port ${PORT}`)
} );