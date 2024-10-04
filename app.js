const express = require('express');
const morgan = require('morgan')

const tourRouter = require('./routes/tourRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

/// MiddeleWare ///
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) =>{
    console.log('Hello from middleware');
    next()
})

/// Router ///
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', usersRouter)

module.exports = app;