const { status } = require('express/lib/response');
const Tour = require('./../moduls/tourModul');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.aliasTopTour = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,summary,difficulty';
    next()

};

exports.getAllTours = async (req, res) => {
    try{

        //BUILD QUERY//
        //1A) Filtering
        const queryobj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryobj[el]);

        //1B) Advanced filtering
        let qeurStr = JSON.stringify(queryobj);
        qeurStr = qeurStr.replace(/\b(gte|gt|lte)\b/g, match => `$ ${match}`);

        let query = Tour.find(JSON.parse(qeurStr))

        //2) Sorting
        if (req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }else{
            query = query.sort('-createdAt')
        }

        // 3) Feild limiting
        if (req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        }else {
           query = query.select('-__v')
        }

        //4) Pagination
        const page = req.query.page * 1 || 1 ;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const numTours = await Tour.countDocuments();
            if(skip >= numTours) throw new Error('This page does not exist')
        }

        // EXECUTE QUERY
        const tours = await query;
        
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