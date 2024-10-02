const fs = require('fs');
const express = require('express');
const morgan = require('morgan')

const app = express();

/// MiddeleWare ///
app.use(morgan('dev'));

app.use(express.json())



/// Route Handler ///
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {
    res.status(200).json({
        status:'success',
        data:{
          tours
        } 
      })
}
 
const getTour = (req, res) => {
    console.log(req.params);
    
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if(!tour){
        return res.status(404).json({
            status:'Fail',
            messege: 'ID doesnt exsist'
        })
    };
    
    res.status(200).json({
      status:'success',
      data:{
        tour
      } 
    })
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1 ].id + 1;
    const newTour = Object.assign({id:newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status:'success',
            data:{
                tour: newTour
            }
        })
    });
};

const updateTour = (req, res) => {

    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:'Faild',
            messege: 'ID doesnt exsist'
        })
    };

    res.status(200).json({
        status:'success',
        data:{
            tour: '<Updated tour here>'
        }
    })
};

const deleteTour = (req, res) => {

    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:'Faild',
            messege: 'ID doesnt exsist'
        })
    };

    res.status(204).json({
        status:'success',
        data: null
    })
     
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        messege: 'this route is not yet defind'
    })
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        messege: 'this route is not yet defind'
    })
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        messege: 'this route is not yet defind'
    })
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        messege: 'this route is not yet defind'
    })
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        messege: 'this route is not yet defind'
    })
};

/// Routing ///
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser)

/// Port ///
const port = 3000;

app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});