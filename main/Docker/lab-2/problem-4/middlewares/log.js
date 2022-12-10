const userModel = require('../models/users');

const session = require('express-session')
async function logRequestBody(req, res, next) {
    console.log("watch request body", req.body)
    if (!session.email){
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.send("notlogged in")
    }
    else
    {
        const currentUser= await userModel.findOne({"email":session.email}) 
        res.locals.user=currentUser
        

    }
       
    next()
    }
  
    module.exports = logRequestBody