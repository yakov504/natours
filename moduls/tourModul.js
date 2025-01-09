const { type } = require('express/lib/response');
const mongoose = require('mongoose')
const slugify =  require('slugify')

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'a tour must have name'],
        unique: true,
        trim: true
    },
    slug: String,
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
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
},
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
}
);

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});

// document middelware: ren before .save() and .create()
// tourSchema.pre('save', function(next) {
//     this.slug = slugify(this.name, { lower: true})
//     next();

// })


// tourSchema.post('save', function(doc, next) {
//     console.log(doc);
//     next();
// })

// QUEY MIDDLEWARE 
tourSchema.pre(/^find/, function(next){
// tourSchema.pre('find', function(next){
    this.find({ secretTour: {$ne: true}})
    this.start = Date.now()
    next()
})

tourSchema.post(/^find/, function(docs, next) {
    console.log(docs);
    next()

});

//AGGREGTION MIDDELWARE

tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true }}})
    console.log(this.pipeline());
    next();

})


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
