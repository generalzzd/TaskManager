const mongoose = require('mongoose')
const validator = require('validator')


const taskScheme = mongoose.Schema({
    description: {
        type: String,
        required:true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
})

taskScheme.pre('save', async function(next){
    const task = this

    console.log('task precedure log')
    next()
})

const Task = mongoose.model('Task', taskScheme)

module.exports = Task