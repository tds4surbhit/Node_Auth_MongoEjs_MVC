const mongoose = require("mongoose");
const { isEmail } = require('validator')
const bycrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Please enter a Email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter the valid Email']
    },
    password: {
        type: String,
        required: [true,'Please enter a Password'],
        minlength: [6,'Minimum Password length should be 6 characters']
    }
})

// Mongoose Hooks for firing a function after doc is saved to db -->
// userSchema.post('save',function( doc , next){
//     console.log('A new user was created and saved', doc);
//     next();
// }

// Fire a function before saving the doc to the database -->
// we will hash the password just before the user document is created .
userSchema.pre('save', async function (next) {
    const salt = await bycrypt.genSalt();
    this.password = await bycrypt.hash(this.password,salt);
    next();
})

// Static method to login user -->
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email: email});
    if(user){
        const auth = await bycrypt.compare(password, user.password);
        if(auth){
            return user;
        }else{
            throw Error('incorrect password')
        }
    }
    throw Error('Incorrect Email');
}

const User = mongoose.model('user', userSchema);
module.exports = User;