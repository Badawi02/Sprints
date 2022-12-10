const mongoose = require('mongoose')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation');
const mongooseValidationErrorTransform = require('mongoose-validation-error-transform');
var categorySchema = new mongoose.Schema({

category: { type: String, required: true, maxlength: 20, minlength: 3 },
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

const categoryModel = mongoose.model('Category', categorySchema)
module.exports = categoryModel