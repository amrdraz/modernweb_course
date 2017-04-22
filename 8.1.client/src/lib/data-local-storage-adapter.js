export default class MemoryAdapter {
  constructor(config = {}) {
    this.store = localStorage
  }
  _getTable(tableName) {
    return JSON.parse(this.store.getItem(tableName) || "[]")
  }
  _setTable(tableName, data) {
    return this.store.setItem(tableName, JSON.stringify(data))
  }
  // create('TodoList', {title:'', items:[]})
  create(tableName, data) {
    return Promise.resolve().then(()=>{
      let collection = this._getTable(tableName)
      data.id = data.id || `${Date.now()}${Math.random()*10000}`
      collection.push(data)
      this._setTable(tableName, collection)
      return data
    })
  }
  createAll(tableName, data) {
    return Promise.resolve().then(()=>{
      return data.map(one=> this.create(tableName, one))
    })
  }
  find(tableName, query) {
    return Promise.resolve().then(()=>{
      let all = this._getTable(tableName)
      let {element} = _find(all, query)
      return element
    })
  }
  findAll(tableName, query) {
    return Promise.resolve().then(()=>{
      let all = this._getTable(tableName)
      return all.filter(one => matchQuery(one, query))
    })
  }
  update(tableName, query, data) {
    return  Promise.resolve().then(_=>{
      let all = this._getTable(tableName)
      let {index, element} = _find(all, query)
      all[index] = Object.assign({}, element, data)
      this._setTable(tableName, all)
      return all[index]
    })
  }
  updateAll(tableName, query, data) {
    return Promise.resolve().then(_=>{
      let all = this._getTable(tableName)
      let updated = []
      let allUpdated = all.map(one => {
        if(matchQuery(one, query)) {
          Object.assign(one, data)
          updated.push(one)
          return one
        }
        return one
      })
      this._setTable(tableName, allUpdated)
      return updated
    })
  }
  delete(tableName, query) {
    return Promise.resolve().then(_=>{
      let all = this._getTable(tableName)
      let { element } = _find(all, query)
      this._setTable(tableName, all.filter(el=>el.id!==element.id))
      return element
    })
  }
  deleteAll(tableName, query) {
    return Promise.resolve().then(_=>{
      let all = this._getTable(tableName)
      let deleted = []
      let allUpdated = all.filter(one => {
        if(matchQuery(query)) {
          deleted.push(one)
          return false
        }
        return true
      })
      this._setTable(tableName, allUpdated)
      return deleted
    })
  }
}

function matchQuery(one, query) {
  if(!isObject(query)) {
    if(one.id === query) {
      return true
    }
  } else {
    if(Object.keys(query).every(key=>one[key]===query[key])) {
      return true
    }
  }
  return false
}

function isObject(_) {
  return !Array.isArray(_) && typeof _ === 'object'
}

function _find(collection, query) {
  let index = -1, element = null;
  collection.find((one, i) => {
    if(matchQuery(one, query)) {
      index = i
      element = collection[i]
      return true
    }
    return false
  })
  return {
    index, element
  }
}

function _remove(collection, index) {
  return [...collection.splice(0, index), ...collection.splice(index+1)]
}
