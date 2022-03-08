//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
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
app.use(cors({
    origin: "*",
})
);
app.use(morgan('dev'))
app.use(express.json())




//Models 

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    quantity: Number,
    category: String,
    pricelb: Number

})
const Product = mongoose.model('Product', ProductSchema)

//Test Route
app.get('/',(req,res) => {
    res.send('Test')
})

//Product Index
app.get('/product', async(req,res) => {
    try{

    res.json(await Product.find({}))
    } catch(error){
        res.status(400).json(error)
    }

})

app.post('/product',async(req,res) => {
    try{
        res.json(await Product.create(req.body))
    } catch(error) {
        res.status(400).json(error)
    }
})

//Products DELETE ROUTE
app.delete('product/:id', async (req,res) => {
    try {
        res.json(await Product.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

// PRODUCT UPDATE ROUTE
app.put('product/:id', async (req,res) => {
    try {
        res.json(await Product.findByIdAndUpdate(req.params.id, req.body));
    } catch (error) {
        res.status(400).json(error); 
    }
})


//Middlewares 






//Routes
app.get('/', (req,res) => {
    res.send('Ready to Go')
})


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})