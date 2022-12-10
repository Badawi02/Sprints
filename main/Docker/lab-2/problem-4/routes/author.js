var express = require('express');
const authorModel = require('../models/authors');
const bookModel = require('../models/books');
var router = express.Router();

router.get('/', async (req, res) => {
  const authors = await authorModel.find({});
  const pageCount = Math.ceil(authors.length / 10);
  let page = parseInt(req.query.p);
  if (!page) { page = 1;}
  if (page > pageCount) {
    page = pageCount
  }
  try {
    return res.render('layouts/authors' ,{page: page,pageCount: pageCount,authors: authors.slice(page * 10 - 10, page * 10) , layout : 'authors'});    
  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.get('/books/:id', async (req, res) => {
  const books = await bookModel.find({user:req.params.id});
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
router.post('/', async (req, res) => {
  const author = new authorModel(req.body);
  try {
   const tmp = await author.save();
    
   
    res.send("added");
  } catch (err) {
    
    res.send(err);
  }
  
});
router.get('/profile', async (req, res) => {
  const books = await bookModel.find({"author":req.params.author}) 

  try {
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.get('/find', async (req, res) => {
  const author = await authorModel.findOne({"id":req.params.id}) 

  try {
    res.send(author);
  } catch (err) {
    res.status(500).send(err);
  }

  
});

router.delete('/:id', async (req, res) => {
  try {
    
    const author = await authorModel.findByIdAndDelete(currentauthor.id)
    if (!author) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});
router.patch('/:id', async (req, res) => {
  try {
    
    await authorModel.findByIdAndUpdate(currentauthor.id, req.body)
    await authorModel.save()
    res.send(author)
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;
