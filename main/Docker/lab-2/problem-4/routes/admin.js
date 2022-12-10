var express = require('express');
const userModel = require('../models/users');
const categoryModel = require('../models/categories');
const authorModel = require('../models/authors');
const bookModel = require('../models/books');
const session = require('express-session');
var flash = require('express-flash');
var bcrypt = require('bcrypt');
var router = express.Router();

// const Image = require('./Image.js')
const multer = require('multer')
const path = require('path')
var filename = null
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"))
  },
  filename: function (req, file, cb) {
    console.log("file", file)
    fileExtension = file.originalname.split(".")[1]
    filename = file.fieldname + "-" + Date.now() + "." + fileExtension
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension)
  },
})
var upload = multer({
  storage: storage
})



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
router.post('/', async (req, res) => {
  if(req.body.email!="admin@admin.com")
  {
   return res.status(500).send({
      message: 'unknown credintials'
   });
  }
  const user = await userModel.findOne({
    "email": req.body.email
  })
  console.log(req.body.email);
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result == true) {
        session.id = user.id;
        res.statusCode = 302;
        res.setHeader("Location", "/admin/home");
        res.send("logged in");
        return;
      } else {
        res.render('layouts/adminlogin', {
          layout: 'adminlogin'
        });
      }
    });
  } else {
    res.render('layouts/adminlogin', {
      layout: 'adminlogin'
    });
  }
});

router.get('/', function (req, res, next) {
  res.render('layouts/adminlogin', {
    layout: 'adminlogin'
  });
});

router.get('/home', async (req, res, ) => {
  const categories = await categoryModel.find({})
  const books = await bookModel.find({})
  const authors = await authorModel.find({})
  books.categories = categories
  books.authors = authors
  res.render('layouts/adminhome', {
    categories: categories,
    books: books,
    authors: authors,
    layout: 'adminhome'
  });
  return;
});

router.post('/categories', async (req, res) => {
  const category = new categoryModel(req.body);
  try {
    const tmp = await category.save();
    res.redirect("/admin/home");
    return;
  } catch (err) {
    res.locals.err=err.message;
    res.redirect('/admin/home');
  }

});

router.get('/categories/:id', async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id)
    if (!category) res.status(404).send("No item found")
    // res.status(200).send("DELETED")
    // res.setHeader("Location", "/admin/home");
    res.redirect("/admin/home");
    return;
  } catch (err) {
    res.locals.err=err.message;
    res.redirect(301, '/admin/home');
  }
});

router.post('/categories/:id', async (req, res) => {
  try {
    console.log("here");

    const temp = await categoryModel.findByIdAndUpdate(req.params.id, req.body)
    temp.save()
    res.redirect("/admin/home");
    return;
  } catch (err) {
    res.locals.err=err.message;

    res.status(301).send(err)
  }
});

router.post('/authors',upload.single('pic'), async (req, res) => {
  req.body.pic=filename
  const author = new authorModel(req.body);
  console.log(author);

  try {
    const tmp = await author.save();
    res.redirect("/admin/home");
    return;
  } catch (err) {
    res.locals.err=err.message;
    res.redirect(301, '/admin/home');
  }

});

router.get('/authors/:id',async (req, res) => {

  try {
    const author = await authorModel.findByIdAndDelete(req.params.id)
    if (!author) res.status(404).send("No item found")
    // res.status(200).send()
    res.redirect("/admin/home");
    return;
  } catch (err) {
    res.locals.err=err.message;
    res.redirect(301, '/admin/home');
  }
});

router.post('/authors/:id',upload.single('pic'), async (req, res) => {
  req.body.pic=filename

  try {
    req.body.pic = filename
    const tmp = await authorModel.findByIdAndUpdate(req.params.id, req.body)
    tmp.save()
    res.redirect("/admin/home");
    return;
    // res.send(author)
  } catch (err) {
    res.locals.err=err.message;
    res.redirect(301, '/admin/home');
  }
});


router.post('/books', upload.single('cover'), async (req, res) => {
 req.body.cover=filename
  const book = new bookModel(req.body);
  try {
    const tmp = await book.save();
    // res.send(Image)
    res.redirect("/admin/home");
    return;
  } catch (err) {
    res.locals.err=err.message;
    res.redirect(301, '/admin/home');
  }

});

router.get('/books/:id', async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id)
    if (!book) res.status(404).send("No item found")
    res.redirect("/admin/home");
    return;
  } catch (err) {
    res.locals.err=err.message;
    res.redirect(301, '/admin/home');
  }
});

router.post('/books/:id',upload.single('cover'), async (req, res,next) => {
  req.body.cover=filename

  try {
    const tmp = await bookModel.findByIdAndUpdate(req.params.id, req.body)
    tmp.save()
    res.redirect("/admin/home");
    return;
  } catch (err) {
    res.locals.err=err.message;
    res.redirect(301, '/admin/home');
  }
});


module.exports = router;
