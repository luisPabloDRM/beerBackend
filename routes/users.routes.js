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

module.exports = router;