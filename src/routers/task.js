const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/task', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        creator: req.user._id
    })

    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.get('/tasks', auth, async (req, res) => {
    try{
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    }catch(e)
    {
        res.status(500).send()
    }
})

router.get('/task/:id', auth, async (req, res) => {
    console.log('asdasdasd')
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, creator: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/task/:id', auth, async (req, res) => {
    var _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" })
    }

    try {
        const task = await Task.findOne({_id: req.params.id, creator: req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }

        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
        
        if (!task)
            return res.status(404).send()
        res.send(task)

    } catch (error) {
        res.status(500).send(error)
    }

})

router.delete('/task/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, creator: req.user._id})
        if(!task)
            return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send()        
    }
})


module.exports = router