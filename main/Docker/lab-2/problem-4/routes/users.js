var express = require('express');
const userModel = require('../models/users');
const session = require('express-session')

var router = express.Router();

router.get('/', async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.get('/profile', async (req, res) => {
  const user = await userModel.findOne({"email":session.email}) 

  try {
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }

  
});
router.post('/find', async (req, res) => {
  const user = await userModel.findOne({"email":req.body.email}) 

  try {
    res.send(user);
    console.log(user)
  } catch (err) {
    res.status(500).send(err);
  }

  
});

router.delete('/:id', async (req, res) => {
  try {
    const currentUser= await userModel.findOne({"email":req.params.email}) 
    const user = await userModel.findByIdAndDelete(currentUser.id)
    if (!user) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const currentUser= await userModel.findOne({"email":req.params.email}) 
    await userModel.findByIdAndUpdate(currentUser.id, req.body)
    await userModel.save()
    res.send(user)
  } catch (err) {
    res.status(500).send(err)
  }
});
router.get('/logout', function(req, res) {
  session.email=null;
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.send("notlogged in")
  return;
});
module.exports = router;
