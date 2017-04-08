const path = require('path');
// https://github.com/louischatriot/nedb
const NeDB = require('nedb');
const _ = require('lodash');

module.exports = class NeDBAdapter {
  constructor(config = {}) {
    this.basePath = config.basePath || path.join(__dirname, '..', 'data')
    this.db = {}
  }
  _collection(collectionName) {
    return this.db[collectionName] || ( this.db[collectionName] = new NeDB({ filename: path.join(this.basePath, `${collectionName}.db`), autoload: true }) )
  }
  // create('TodoList', {title:'', items:[]})
  create(collectionName, data) {
    return new Promise((resolve, reject)=>{
      this._collection(collectionName).insert(data, (err, result)=>{
        if (err) return reject(err)
        result = mapResult(result)
        resolve(result)
      })
    })
  }
  createAll(collectionName, data) {
    return new Promise((resolve, reject)=>{
      data = data.map(mapQuery)
      this._collection(collectionName).insert(data, (err, result)=>{
        if (err) return reject(err)
        result = result.map(mapResult)
        resolve(result)
      })
    })
  }
  find(collectionName, query) {
    return new Promise((resolve, reject)=>{
      query = mapQuery(query)
      this._collection(collectionName).findOne(query, (err, result)=>{
        if (err) return reject(err)
        result = mapResult(result)
        resolve(result)
      })
    })
  }
  findAll(collectionName, query) {
    return new Promise((resolve, reject)=>{
      query = mapQuery(query)
      this._collection(collectionName).find(query, (err, result)=>{
        if (err) return reject(err)
        result = result.map(mapResult)
        resolve(result)
      })
    })
  }
  update(collectionName, query, data) {
    return new Promise((resolve, reject)=>{
      query = mapQuery(query)
      data = mapData(data)
      let options = { returnUpdatedDocs: true }
      this._collection(collectionName).update(query, data, options, (err, numAffected, affectedDocuments) => {
        if (err) return reject(err)
        affectedDocuments = mapResult(affectedDocuments)
        resolve(affectedDocuments)
      })
    })
  }
  updateAll(collectionName, query, data) {
    return new Promise((resolve, reject)=>{
      query = mapQuery(query)
      data = mapData(data)
      let options = { multi: true, returnUpdatedDocs: true }
      this._collection(collectionName).update(query, data, options, (err, numAffected, affectedDocuments) => {
        if (err) return reject(err)
        affectedDocuments = affectedDocuments.map(mapResult)
        resolve(affectedDocuments)
      })
    })
  }
  delete(collectionName, query) {
    return new Promise((resolve, reject)=>{
      query = mapQuery(query)
      this._collection(collectionName).remove(query, (err, numRemoved) => {
        if (err) return reject(err)
        resolve(numRemoved)
      })
    })
  }
  deleteAll(collectionName, query) {
    return new Promise((resolve, reject)=>{
      query = mapQuery(query)
      this._collection(collectionName).remove(query, { multi:true }, (err, numRemoved) => {
        if (err) return reject(err)
        resolve(numRemoved)
      })
    })
  }
}

function mapQuery(query) {
  // not handeling nests id to _id
  if (query.id) {
    query = Object.assign({}, query, { _id: query.id })
    delete query.id
  }
  return query
}

function mapData(data) {
  if (!data.$set) {
    let special = ['$push', '$pop', '$addToSet', '$pull', '$inc', '$min', '$max', '$unset', '$slice', '$each']
    let obj = _.omit(data, special)
    data = Object.assign({ $set: obj }, _.omit(data, Object.keys(obj)) )
  }
  return data
}

function mapResult(result) {
  if(result) {
    result = Object.assign({}, result, { id: result._id })
    delete result._id
    return result
  }
  return result
}
