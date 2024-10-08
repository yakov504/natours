const { status } = require('express/lib/response');
const Tour = require('./../moduls/tourModul');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = async (req, res) => {
    try{
        const tours = await Tour.find()
        
        res.status(200).json({
                status:'success',
                data:{
                    tours
                    } 
                })
    }catch(err){
      res.status(404).json({
        status: 'fail',
        messege: err
      })
    }
};
 
exports.getTour = async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.id)
        // Tour.findOne({_id: req.params.id})
        res.status(200).json({
              status:'success',
              data:{
                    tour
                  } 
                })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            messege: err
          })
    }
};

exports.createTour = async (req, res) => {
    try{
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status:'success',
            data:{
                tour: newTour
            }
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            messege:'invalid data sent'
        });
    }
};

exports.updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status:'success',
            data:{
                tour: tour
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            messege: err
        })
    }
};

exports.deleteTour = async (req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'success',
            data: null
        })
         
    }catch(err){
        res.status(404).json({
            status:'fail',
            messege: err
        })
    }
};