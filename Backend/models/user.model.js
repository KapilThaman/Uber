const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 


const userSchema = new mongoose.Schema(
    {
        fullname:{
            firstname : {
                type: String,
                required: true,
                minlength: [3,"First Name should be 3 or more characters"]
            },
            lastname : {
                type: String,
                minlength: [3,"Last Name should be 3 or more characters"]
            }
        },
        email:{
            type: String,
            required: true,
            unique: true,
            minlength: [5,"Email should be 5 or more characters"]
        },
        password:{
            type: String,
            required: true,
            select: false
        },
        socketId: {
            type: String
        }
    }
)

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword  = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword  = async function (password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;