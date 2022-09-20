const Mongoose = require('mongoose');
const {Schema} = Mongoose;




const uploadSchema = new Schema(
    
    {
    name :{type: String, required:true},
    image : {type: String, required: false},
    price : { type: Number, required: true },
    description : { type : String , required: false},
    rating : { type: Number , required: false },
}, {
    timestamps: true
})

const UploadModel = Mongoose.model("Upload", uploadSchema);

module.exports = UploadModel;