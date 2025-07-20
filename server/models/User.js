const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false,
        default:null
    },
    image:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User',UserSchema);