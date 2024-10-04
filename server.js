const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const app = require('./app')

// console.log(process.env);

/// Port ///
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App runing on port ${port}`);
});