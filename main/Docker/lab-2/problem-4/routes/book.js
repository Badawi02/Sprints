var express = require('express');
const bookModel = require('../models/books');
const readingStatusModel = require('../models/readingBookStatus');
const userModel = require('../models/users');
const reviewsModel =require('../models/reviews')


const session = require('express-session')

var router = express.Router();

router.get('/', async (req, res) => {
  var booksIds = [];
  try {
    const books = await bookModel.find({});
    
  const user = await userModel.findOne({"email":session.email}) 
  const currentState = await readingStatusModel.find({"user":user.id}); 
  currentState.forEach((x)=>{
    booksIds.push(x.book.id);
 })
 const pageCount = Math.ceil(books.length / 10);
 let page = parseInt(req.query.p);
 if (!page) { page = 1;}
 if (page > pageCount) {
   page = pageCount
 }
 return res.render('layouts/books' ,{page: page,pageCount: pageCount,booksIds: booksIds,books: books.slice(page * 10 - 10, page * 10) , state: currentState,layout : 'books'});
    
  } catch (err) {
    return res.status(500).json(err);

  }

  
});
router.get('/allbooks', async (req, res) => {
  const books = await bookModel.find({});
  const pageCount = Math.ceil(books.length / 10);
  let page = parseInt(req.query.p);
  if (!page) { page = 1;}
  if (page > pageCount) {
    page = pageCount
  }
  try {
    return res.render('layouts/authorsbook' ,{page: page,pageCount: pageCount,books: books.slice(page * 10 - 10, page * 10) , layout : 'authorsbook'});    
  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.get('/:id/addstatus/:status', async (req, res) => {
  const currentUser= await userModel.findOne({"email":session.email}) 
  
     return readingStatusModel.findOneAndUpdate({"user":currentUser.id,"book":req.params.id},{"status":req.params.status},async function(err, doc) {
      if (!doc){
        return readingStatusModel.create({"status":req.params.status,"book":req.params.id,"user":currentUser._id}, function (err, user) {
          if (err) {
              return res
                  .status(400)
                  .json(err)
          } else {
            return res.send('Succesfully saved.');
          }
      })
      }
      return res.send('Succesfully saved.');
  });
});

router.post('/:id/rate/:rate', async (req, res) => {
  var id = req.params.id
  var prvbook = await bookModel.findById(id)
  var book = await bookModel.findOneAndUpdate({_id:id},{rate:parseFloat(prvbook.rate)+parseFloat(req.params.rate),raters:prvbook.raters+1}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
});
 
});




router.get('/search', async (req, res) => {
  
  word = req.query.word.replace(/\s+/g, '');

  var book = await bookModel.find({ 'name' : { '$regex' : word, '$options' : 'i' } });
  try {
    console.log(book)
    if(word)
    res.json({ book: book })
 else
 res.json({})
  } catch (err) {
    
    res.send(err);
  }
  
});
router.get('/:id', async (req, res) => {
  var id = req.params.id
  var book = await bookModel.findById(id).populate('user').populate('category').exec();
  const user = await userModel.findOne({"email":session.email}) 
  const state = await readingStatusModel.findOne({"user":user._id , "book": req.params.id}); 
  const review = await reviewsModel.find({"book": req.params.id}).sort({_id:-1}).limit(5).exec();
  const stars=book.rate/book.raters
  try {
    
    // res.send(review)
    res.render('layouts/getBook' ,{ stars:stars,book:book ,state:state,reviews:review, layout:'getBook'});

  } catch (err) {
    res.status(500).send(err);
  }

  
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(currentbook.id)
    if (!book) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});
router.patch('/:id', async (req, res) => {
  try {
    await bookModel.findByIdAndUpdate(currentbook.id, req.body)
    await bookModel.save()
    res.send(book)
  } catch (err) {
    res.status(500).send(err)
  }
});


// add review 
router.post('/review', async (req, res) => {
  if(req.body.review){
  const currentUser= await userModel.findOne({"email":session.email}) 
  const currentReview = new reviewsModel({"user":currentUser.id,"review":req.body.review,"book":req.body.book}) 


  try {
    const tmp = await currentReview.save();
    return res.redirect("/books/"+req.body.book);

  } catch (err) {
    res.status(500).send(err);
  }

}
else{    return res.redirect("/books/"+req.body.book);
}
});

module.exports = router;
