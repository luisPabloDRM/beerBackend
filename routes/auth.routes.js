var express = require('express');

const User = require('../models/users.model');
const Token = require('../models/token.model')

const jwt = require('jsonwebtoken');
const {jsonResponse} = require('../lib/jsonresponse')
const {ACCCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

const router = express.Router();


//RUTAS

router.post('/singup', async (req, res, next)=>{
    const {username, password} = req.body;

    try{

        const user = new User();
        const userExists = await user.usernameExists(username);

        if(userExists){
            return next(new Error('user already exists'));
        }else{
            const user = new User({username, password});

            let accessToken = await user.createAccessToken();
            let refreshToken = await user.createRefreshToken();

            user.save();

            res.json(jsonResponse(200, {
                message: 'User created successfully',
                accessToken,
                refreshToken
            }));
        }

    }catch(err){
        console.log(err);
    }
});


router.post('/login', (req, res, next)=>{

});

router.post('/logout', (req, res, next)=>{

});

router.post('/refresh-token', (req, res, next)=>{

});

module.exports = router;