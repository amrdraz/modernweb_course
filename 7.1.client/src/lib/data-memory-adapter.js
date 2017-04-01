export default class MemoryAdapter {
  constructor(config = {}) {
    this.data = config.data || {}
  }
  create(name, data) {
    return Promise.resolve().then(()=>{
      this.data[name] = this.data[name] || []
      data.id = data.id || `${Date.now()}${Math.random()*10000}`
      this.data[name].push(data)
      return data
    })
  }
  createAll(name, data) {
    return Promise.resolve().then(()=>{
      return data.map(one=> this.create(name, one))
    })
  }
  find(name, query) {
    return this.findAll(name, query).then((all)=>{
      return all[0]
    })
  }
  findAll(name, query) {
    return Promise.resolve().then(()=>{
      this.data[name] = this.data[name] || []
      let all = this.data[name]
      if(!isObject(query)) {
        return all.filter(one=> one.id === query )
      } else {
        return all.filter(one=> { return Object.keys(query).all(key=>one[key]===query[key]) } )
      }
    })
  }
  update(name, query, data) {
    return this.find(name, query).then(one=>{
      return Object.assign(one, data)
    })
  }
  updateAll(name, query, data) {
    return this.findAll(name, query).then(all=>{
      return all.map(one=>{
        return Object.assign(one, data)
      })
    })
  }
  delete(name, query) {
    return this.find(name, query).then(one=>{
      let collection = this.data[name] = this.data[name] || []
      let index = collection.indexOf(one)
      if(~~index) {
        collection.splice(index, 1)
      }
      return one
    })
  }
  deleteAll(name, query) {
    return this.findAll(name, query).then(all=>{
      let collection = this.data[name] = this.data[name] || []
      return all.map(one=> {
        let index = collection.indexOf(one)
        if(~~index) {
          collection.splice(index, 1)
        }
        return one
      })
    })
  }
}

function isObject(_) {
  return !Array.isArray(_) && typeof _ === 'object'
}
