const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model(
    'User',
    {
        name: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            }
        },
        age: {
            type: Number,
            validate(value){
                if(value < 0)
                    throw new Error('Age must be a postive number')
            }
        }
    }
)

const me = new User({
    name: 'Zidi James',
    email: 'zabc@hotmail.com',
    age: 26
})

me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})


// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const task = new Task({
//     description: 'this is task desciption',
//     completed: true
// })

// task.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })