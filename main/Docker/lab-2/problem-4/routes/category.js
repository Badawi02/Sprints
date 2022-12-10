var express = require('express');
const categoryModel = require('../models/categories');
const bookModel = require('../models/books');
var router = express.Router();

router.get('/', async (req, res) => {
  const categories = await categoryModel.find({});
  const pageCount = Math.ceil(categories.length / 10);
  let page = parseInt(req.query.p);
  if (!page) { page = 1;}
  if (page > pageCount) {
    page = pageCount
  }
  try {
    return res.render('layouts/categories' ,{page: page,pageCount: pageCount,categories: categories.slice(page * 10 - 10, page * 10) ,layout : 'categories'});

  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.post('/', async (req, res) => {
    const category = new categoryModel(req.body);
    try {
     const tmp = await category.save();
      res.redirect("/admin/home");
      return;
    } catch (err) {
      res.send(err);
    }
    
  });
router.get('/books/:id', async (req, res) => {
  const books = await bookModel.find({category:req.params.id}) 
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
router.get('/find', async (req, res) => {
  const category = await categoryModel.findOne({"id":req.params.id}) 

  try {
    res.send(category);
  } catch (err) {
    res.status(500).send(err);
  }

  
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id)
    if (!category) res.status(404).send("No item found")
    // res.status(200).send("DELETED")
    // res.setHeader("Location", "/admin/home");
    res.redirect("/admin/home");
    return;
  } catch (err) {
    res.status(500).send(err)
  }
});
router.patch('/:id', async (req, res) => {
  try {
    
    await categoryModel.findByIdAndUpdate(currentcategory.id, req.body)
    await categoryModel.save()
    res.send(category)
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;
