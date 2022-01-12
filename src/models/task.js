const mongoose = require('mongoose')
const validator = require('validator')


const Task = mongoose.model('Task', {
    description: {
        type: String,
        required:true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// const task = new Task({
//     description: 'this is task desciption',
//     completed: true
// })

// task.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

module.exports = Task