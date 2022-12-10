const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation');
const mongooseValidationErrorTransform = require('mongoose-validation-error-transform');

const bookschema = mongoose.Schema({
    cover: {
      type: String,
      required: true
    },
    
    name: {
        type: String,
        default: '',
        required: true,
        unique: true


    },
    rate: { type: Number ,default:0.0},
    raters: { type: Number ,default:0},
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true},
    user:{type: Schema.Types.ObjectId, ref: 'Author', required: true} ,

    

});
bookschema.pre('find', function (next) {
    this.populate('user')
    this.populate('category')
    next()
    })
    
      
mongoose.plugin(mongooseValidationErrorTransform, {
 
    //
    // these are the default options you can override
    // (you don't need to specify this object otherwise)
    //
   
    // should we capitalize the first letter of the message?
    capitalize: true,
   
    // should we convert `full_name` => `Full name`?
    humanize: true,
   
    // how should we join together multiple validation errors?
    transform: function(messages) {
      return messages.join(',<br>');
    }
   
  });
  mongoose.plugin(mongooseValidationErrorTransform, {
  transform: function(messages) {
    if (messages.length === 1) return messages[0];
    return `<ul class="text-xs-left mb-0"><li>${messages.join('</li><li>')}</li></ul>`;
  }
});
mongoose.plugin(mongooseBeautifulUniqueValidation);
const bookModel =  mongoose.model('Book', bookschema);

module.exports = bookModel;