<<<<<<< HEAD
const MongoClient = require('mongodb').MongoClient

const state = {
  db: null,
}
exports.connect = (url, done) => {
  if (state.db) return done()
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) { console.log(err); return done(err)}
    state.db = client.db('ecommerce')
    done()
  })
}

exports.getCollection = (collectionName) => {
    return state.db.collection(collectionName)
};

exports.getDB = () => state.db

exports.close = (done) => 
{
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null
     state.mode = null
      done(err)
    })
  }
=======
const MongoClient = require('mongodb').MongoClient

const state = {
  db: null,
}
exports.connect = (url, done) => {
  if (state.db) return done()
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) { console.log(err); return done(err)}
    state.db = client.db('mydb')
    done()
  })
}

exports.getCollection = (collectionName) => {
    return state.db.collection(collectionName)
};

exports.getDB = () => state.db

exports.close = (done) => 
{
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null
     state.mode = null
      done(err)
    })
  }
>>>>>>> fc992b2e7f19774735879290cba78620155969c1
}