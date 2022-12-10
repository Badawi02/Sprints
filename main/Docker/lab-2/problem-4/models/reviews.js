const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var bookReviewSchema =  mongoose.Schema({

    user:{type: Schema.Types.ObjectId, ref: 'User', required: true},
    book:{type: Schema.Types.ObjectId, ref: 'Book', required: true} ,
    review:{type:String}

    });
    bookReviewSchema.pre('find', function (next) {
        this.populate('user')
        this.populate('book')
        next()
        })
        

 const reviewModel =  mongoose.model('BookReview', bookReviewSchema);
 module.exports = reviewModel
