const mongoose = require('mongoose');
const {Schema} = mongoose;




const uploadSchema = new Schema({
    name :{type: String, required:true},
    image : {type: String, required: false},
    price : { type: Number, required: true },
    rating : { type: Number , required: true },
}, {
    timestamps: true
})

const UploadModel = mongoose.model("Upload", uploadSchema);

module.exports = UploadModel;