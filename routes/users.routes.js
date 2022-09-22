const express = require('express');
const createError = require('http-errors')
const router = express.Router();
const {jsonResponse} = require('../lib/jsonresponse')
const User= require('../models/users.model')


/* GET Users Listing*/
router.get('/', async function(req, res, next){
    let results = {};

    try {
        results = await User.find({}, 'username password')
    } catch (ex) {
        
    }
    res.json(results)
});


router.post('/', async function(req, res, next){
    const {username , password} = req.body;

    if(!username || !password){
        next();
    }else if(username && password){
        const user = new User({username, password});

        const exists = await user.usernameExists(username);

        if(exists){
            //existe el nombre de usuario
            res.json(jsonResponse(400,{
                message: 'The user is taken. Try with another one'
            }))
            //next();

        }else{
            await user.save();

            res.json(jsonResponse(200, {
                message : 'User created succesfully'
            }))
        }
    }
})
module.exports = router;