const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const app = require('./app')

// console.log(process.env);

/// DB   Connection ///
mongoose.connect(process.env.DATABASE_MONGO_CONNECTION || process.env.DATABASE_LOCAL)
.then(() => console.log('mongoDB is connected'));

/// Port ///
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App runing on port ${port}`);
});