const express = require('express');
const morgan = require('morgan');
const path = require('path')


const app = express();

// Cors
var cors = require('cors')

app.use(cors()) 
// connect to database
const  { mongoose } = require('./database');

//Settings
app.set('port', process.env.PORT  || 4000)

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/upload' , require('./routes/update.routes'));

//Static files

app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})