var util = require('util');
var encoder = new util.TextEncoder('utf-8');
const mongodb = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

const dbClient = mongodb.MongoClient
dbClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    console.log("Connected Mongodb")

    const db = client.db(database)

    // db.collection('users').insertOne({
    //     name: "Zidi2",
    //     age: 30
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result)
    //     client.close()
    // }
    // )
    // db.collection('users').insertMany(
    //     [
    //         {
    //             name: 'Jen',
    //             age: 28
    //         },
    //         {
    //             name: 'hasd',
    //             age: 52
    //         }
    //     ],
    //     (error, result) => {
    //         if(error)
    //             return console.log(error)
    //         console.log(result)
    //         client.close()
    //     }
    // )

    db.collection('tasks').insertMany(
        [{
            decription: 'Clean the house',
            complete: true
        }],
        (error, result) => {
            console.log(result)
        }
    )

})