const express = require('express');
const morgan = require('morgan')

const tourRouter = require('./routes/tourRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

/// MiddeleWare ///
app.use(morgan('dev'));

app.use(express.json())

app.use((req, res, next) =>{
    console.log('Hello from middleware');
    next()
})

/// Router ///
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', usersRouter)

/// Port ///
const port = 3000;

app.listen(port, () => {
    console.log(`App runing on port ${port}`);
});