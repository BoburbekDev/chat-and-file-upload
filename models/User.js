const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required']
    }, 
    lastName: {
        type: String, 
        required: [true, 'lastName is required']
    },
    login: {
        type: String,
        unique: true,
        required: [true, 'login is required'],
        min: 3,
        max: 32
    }, 
    file: String,
    password: {
        type: String,
        required: [true,'password is required'],
        min: 8,
        max: 32
    }
}, {
    timestamps: true,
    versionKey: false
})


userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
module.exports = mongoose.model('User', userSchema)