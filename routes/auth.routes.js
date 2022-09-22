var express = require('express');
const createError = require('http-errors');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Token = require('../models/token.model')
const {jsonResponse} = require('../lib/jsonresponse')
const {ACCCES_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

const User = require('../models/users.model');

//RUTAS

router.post('/singup', async (req, res, next)=>{
    const {username, password} = req.body
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
            const accessToken = user.createAccessToken();
            const refreshToken = user.createRefreshToken();
            await user.save();

            res.json(jsonResponse(200, {
                message : 'User created succesfully',
                accessToken,
                refreshToken
            }))
        }
    }
});

router.post('/login', (req, res, next)=>{

});

router.post('/logout', (req, res, next)=>{

});

router.post('/refresh-token', (req, res, next)=>{

});

module.exports = router;