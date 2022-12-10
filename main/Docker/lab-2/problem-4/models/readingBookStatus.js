const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var bookStatusSchema =  mongoose.Schema({
    status:{ type: String , default:"reading" , enum:[ "reading" , "want to read" , "finished reading" ]},

    user:{type: Schema.Types.ObjectId, ref: 'User', required: true,unique:false,default:1},
    book:{type: Schema.Types.ObjectId, ref: 'Book', required: true,unique:false,default:1} ,

    });
    
    bookStatusSchema.pre('find', function (next) {
        this.populate('user')
        this.populate('book')
        next()
        })
 const readingStatusModel =  mongoose.model('ReadingStatus', bookStatusSchema);
 module.exports = readingStatusModel
