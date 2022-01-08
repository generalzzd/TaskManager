console.log('This is mongodb script')

const mongodb = require('mongodb')
const dbClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

