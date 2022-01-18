//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT = 3001,DATABASE_URL } = process.env
require('dotenv').config()

//Establish Connection
mongoose.connect(process.env.DATABASE_URL);
// Connection Events
mongoose.connection
.on('open', () => console.log(' You are connected to MongoDB '))
.on('close', () => console.log('You are disconnected to Mongodb'))
.on('error', (error) => console.log('MongoDB error'));


//Middlewares 
const cors = require('cors');
const morgam = require('morgan');





//Routes
app.get('/', (req,res) => {
    res.send('Ready to Go')
})


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})