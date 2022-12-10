const mongoose = require('mongoose')
//var bcrypt = require('bcrypt');
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation');
const mongooseValidationErrorTransform = require('mongoose-validation-error-transform');
var P = mongoose.Promise = require('bluebird');
SALT_WORK_FACTOR = 10;
var userSchema = new mongoose.Schema({
firstName: { type: String, required: true, maxlength: 20, minlength: 3 },
lastName: { type: String, required: true, maxlength: 20, minlength: 3 },
password: { type: String, required: true, minlength: 8 },
dob: { type: Date, required: true, max: new Date('2000-01-01') },
gender: { type: String, enum: ['m', 'f'] ,required: true,},
email: { type: String, match: /.+@.+\..+/, unique: true, index: true },
phoneNo: { type: String, maxlength: 11, minlength: 11, unique:true}
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

userSchema.pre('save', function(next) {
    var user = this;
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const userModel = mongoose.model('User', userSchema)
var data=[{email:"admin@admin.com",password:"admin123",firstName:"admin",lastName:"admin",dob:"01-01-1990",gender:"m",phoneNo:"00000000000"}]
P.all(data.map(i => new userModel(i).save()))
    .then(() => console.log('Data saved'))
    .catch((err) => console.log('Error: ' + err))
module.exports = userModel
