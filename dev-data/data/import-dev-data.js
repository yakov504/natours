const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Tour = require('./../../moduls/tourModul')

dotenv.config({path:'./config.env'})

/// DB Connection ///
mongoose.connect(process.env.DATABASE_MONGO_CONNECTION || process.env.DATABASE_LOCAL)
.then(() => console.log('mongoDB is connected'));

/// Read json file ///
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

/// Import data into DB /// 
const importData = async () => {
    try{
        await Tour.create(tours);
        console.log('Data succesfuly loadded!');
    }catch(err){
        console.log(err);
    }
    process.exit();
}; 

/// Delete all data from DB /// 
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfuly deleted!');
    }catch(err){
        console.log(err);
    }
};

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}

