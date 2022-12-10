const express = require('express')
const mongoose = require('mongoose')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const bookRoute = require('./routes/book')
var flash = require('express-flash')

const categoryRouter = require('./routes/category')
const authorRoute = require('./routes/author')
const path = require('path');
const { check, validationResult } = require('express-validator');
const auth = require('./middlewares/log')
var exphbs  = require('express-handlebars');
require('./server/config/connection');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')
var helpers2 = require('handlebars-helpers')({
    handlebars: Handlebars
  });
const PORT = process.env.PORT || 5000

const app = express();
// Handlebars.registerHelper('contains', function(needle, haystack, options) {
//     needle = Handlebars.escapeExpression(needle);
//     haystack = Handlebars.escapeExpression(haystack);
//     return (haystack.indexOf(needle) > -1) ? options.fn(this) : options.inverse(this);
//  });
Handlebars.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 1; i <= n; ++i)
      accum += block.fn(i);
  return accum;
});
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: helpers2
    
    
}));
app.set('view engine', 'handlebars');

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
app.use(flash())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

app.use('/', authRouter)
app.use('/admin', adminRouter)

app.use(auth)
app.use('/users', userRouter)
app.use('/books',bookRoute)
app.use('/authors', authorRoute)
app.use('/categories',categoryRouter)
