const mongoose = require('mongoose');

const URI = 'mongodb://localhost:/beeradvisor';

mongoose.connect(URI)
    .then(db =>console.log('DB is connected'))
    .catch(err => console.error(err));


    module.exports = mongoose;