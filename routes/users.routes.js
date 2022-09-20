const express = require('express');
const router = express.Router();
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
            res.json({
                message: 'Usuario ya existe'
            })
            //next();

        }else{
            await user.save();

            res.json({
                message: 'Usuario registrado'
            })
        }
    }
})
module.exports = router;