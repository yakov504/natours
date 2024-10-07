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

exports.updateTour = (req, res) => {
    res.status(200).json({
        // status:'success',
        // data:{
        //     tour: '<Updated tour here>'
        // }
    })
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status:'success',
        data: null
    })
     
};