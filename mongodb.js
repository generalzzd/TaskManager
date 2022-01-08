var util= require('util');
var encoder = new util.TextEncoder('utf-8');
const mongodb = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

const dbClient = mongodb.MongoClient
dbClient.connect(connectionURL, {useNewUrlParser: true},(error, client)=>{
    if(error)
    {
        return console.log('Unable to connect to database');
    }
    console.log("Connected Mongodb")
})