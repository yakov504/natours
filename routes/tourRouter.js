const express = require('express');
const toursController = require('./../controller/toursController')

const router = express.Router();

router.route('/').get(toursController.getAllTours)
.post(toursController.createTour);

router.route('/:id').get(toursController.getTour)
.patch(toursController.updateTour)
.delete(toursController.deleteTour);

module.exports = router;