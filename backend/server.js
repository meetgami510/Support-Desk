const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./confige/db')
const {errorHandler}  = require('./middlerwar/errorMiddelwar')

const port = process.env.PORT || 5000;
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}));

//connect to DB
connectDB();

app.get('/',(req,res)=>{
    // res.send('hello');

    //Data in form of JSON ( javascript object Notation)
    res.status(400).json({message: 'welcome to the support Desk API'})
})

//Routes
app.use('/api/users',require('./routes/userRoutes.js'));
//if any type of error occure in out routes so that call the errorHandler .


//Handling the Error  
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is started ${port}`)
})