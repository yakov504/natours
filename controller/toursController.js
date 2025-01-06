const { status } = require('express/lib/response');
const Tour = require('./../moduls/tourModul');
const APIFeateres = require('./../utils/apiFeatires')
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.aliasTopTour = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,summary,difficulty';
    next()

};

exports.getAllTours = async (req, res) => {
    try{
        // EXECUTE QUERY
        const features = new APIFeateres(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
        const tours = await features.query;
        
        res.status(200).json({
                status:'success',
                data:{
                    tours
                    } 
                })
    }catch(err){
      res.status(404).json({
        status: 'fail',
        message: err.message
        
    })
    // console.log(err)
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
            messege: err.message
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
            messege:err
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

exports.getTourStats = async (req, res) =>{

    try{
        const stats = await Tour.aggregate([
            {
                $match: {ratingsAverage: { $gte:4.5 }}
            },
            {
                $group:{
                    // _id: '$difficulty',
                    _id: '$ratingAverage',
                    numTours: { $sum: 1 },
                    numRating: { $sum: 'ratingsQuantity'},
                    avgRating: { $avg:'$ratingAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price'},
                    maxPrice: { $max: '$price'},
                }
            },
            {
                $sort: {avgPrice: 1 }
            },
        ]);
        res.status(200).json({
            status:'success',
            data: {
                stats
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            messege: err
        })
    }
}