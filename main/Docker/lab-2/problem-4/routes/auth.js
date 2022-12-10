var express = require('express');
const userModel = require('../models/users');
const session = require('express-session')
let flash = require('connect-flash')
var bcrypt = require('bcrypt');

var router = express.Router();
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}))
router.use(flash())
router.use(session({
  genid: function (req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))
router.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000
  }
}))
router.post('/login', async (req, res) => {
  const user = await userModel.findOne({
    "email": req.body.email
  })
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result == true) {
        console.log("true")
        session.email = req.body.email;

        res.statusCode = 302;
        res.setHeader("Location", "/books");
        res.send("logged in");
        return;
      } else {
        res.render('layouts/main', {
          locals: {
            message: 'Incorrect password'
          }
        });
      }
    });
  } else {
    res.render('layouts/main', {
      locals: {
        message: 'Incorrect username or password'

      }
    });

  }
});
router.post('/signup', async (req, res) => {
  const user = new userModel(req.body);
  try {
    const tmp = await user.save();

    session.email = req.body.email;
    res.statusCode = 302;
    res.setHeader("Location", "/books");
    res.send("signed up");
    return;
  } catch (err) {
    if (!err.errors.email)
      res.render('layouts/main', {
        locals: {
          err: err.message
        }
      });
    else {
      res.render('layouts/main', {
        locals: {
          err: err.message,
          layout: "main"
          /*email:err.errors.email.message*/

        }
      });
    }
  }

});
router.get('/', function (req, res) {
  res.render('layouts/main' /*,{locals: {title: 'Welcome!'}}*/ );
  return;
});

module.exports = router;