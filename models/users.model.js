const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const {ACCES_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

const UserSchema = new mongoose.Schema({
    username : {type:String, required: true, unique: true},
    password : {type: String, required : true},
    name:{type:String}
})

// Hacemos Metodo para saber que queremos que pase cuando se inserte un nuevo usuario

UserSchema.pre('save', function(next){
    if(this.isModified('password')|| this.isNew){
        const document = this;

        bcrypt.hash(document.password, 10, function(err, hash){
            if(err){
                next(err);
            }else{
                document.password = hash;
                next()
            }

        });
    }else{
        next();
    }
})