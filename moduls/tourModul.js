const { type } = require('express/lib/response');
const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'a tour must have name'],
        unique: true,
        trim: true
    },
    duration:{
        type:Number,
        required:[true, 'a tour must have a durtion']
    },
    maxGroupSize:{
        type:Number,
        required:[true, 'a tour must have a group size']
    },
    difficulty:{
        type: String,
        required: [true, 'a tour must have a difficulty']
    },
    ratingsAverage:{
        type: Number,
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required:[true, 'a tour must have price']
    },
    priceDiscount:Number,
    summary:{
        type: String,
        trim: true,
        required: [true, 'a tour must have a description']
    },
    description:{
        type: String,
        trim:true
    },
    imageCover:{
        type: String,
        required: [true, 'a tour must have a image']
    },
    imges:[String],
    createdAt:{
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]
},
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
}
);

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
