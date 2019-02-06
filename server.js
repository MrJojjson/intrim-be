const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// connect to client
mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  //...
})
// or
mongo.connect(url)
.then(client => {
    console.log(client)
  })
  .catch(err => {
  console.error(err)
  })

// select a database
const db = client.db('kennel');

// get a collection (if null it will be created)
const collection = db.collection('dogs');

// insert single item
collection.insertOne({name: 'Roger'})
.then(item => {
    console.log(item)
  })
  .catch(err => {
  console.error(err)
  })

// insert multiple items
collection.insertMany([{name: 'Togo'}, {name: 'Syd'}])
.then(item => {
    console.log(item)
  })
  .catch(err => {
  console.error(err)
  })

// find all documents
collection.find()
  .then(item => {
    console.log(item)
  })
  .catch(err => {
  console.error(err)
  })

// find specific documents
collection.find({name: 'Togo'}).toArray({name: 'Togo'})
  .then(item => {
    console.log(item)
  })
  .catch(err => {
  console.error(err)
  })
// or
collection.findOne({name: 'Togo'})
  .then(item => {
    console.log(item)
  })
  .catch(err => {
  console.error(err)
  })

// update a specific document
collection.updateOne({name: 'Togo'}, {'$set': {'name': 'Togo2'}})
.then(item => {
    console.log(item)
  })
  .catch(err => {
  console.error(err)
  })

// delete a specific document
collection.deleteOne({name: 'Togo'})
.then(item => {
    console.log(item)
  })
  .catch(err => {
  console.error(err)
  })

// close the connection
client.close()