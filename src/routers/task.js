const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/task', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.get('/tasks', (req, res) => {
    const task = new Task(req.body)
    Task.find({}).then((e) => {
        res.send(e)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.patch('/task/:id', async (req, res) => {
    var _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" })
    }

    try {
        var e = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!e)
            return res.status(404).send()
        res.send(e)

    } catch (error) {
        res.status(500).send(error)
    }

})

router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task)
            return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send()        
    }
})


module.exports = router