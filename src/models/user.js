const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0)
                throw new Error('Age must be a postive number')
        }
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        console.log('user is null')
        throw new Error('Unable to login')
    }
    console.log('send in pass: ',password)
    console.log('user password: ', user.password)
    console.log('hash send pass: ', await bcrypt.hash(password, 8))
    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch){
        console.log('user is nut match')
        throw new Error('Unable to login')
    }    
    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    console.log('Run pre procedure')
    try {
        if(user.isModified('password')){
            console.log('Create password: ', user.password)
            user.password = await bcrypt.hash(user.password, 8)
            console.log('After Create password: ', user.password)
        }
    } catch (error) {
        console.log("@@@"+error)
    }

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User