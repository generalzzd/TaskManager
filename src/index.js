const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/users', async (req, res) => {

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

// app.get('/users/:id',async (req, res) => {
//     const _id = req.params.id

//     User.findById(_id).then((user) => {
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log('users patch')
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/task', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req, res) => {
    const task = new Task(req.body)
    Task.find({}).then((e) => {
        res.send(e)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/task/:id', (req, res) => {
    var _id = req.params.id
    Task.findById(_id).then((e) => {
        if (!e)
            return res.status(404).send()
        res.send(e)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

