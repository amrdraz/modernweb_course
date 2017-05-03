const EventEmitter = require('./event-emitter')
// const Record = require('./data-record')

module.exports = class Mapper extends EventEmitter {

  constructor(opts) {
    super()
    this.name = opts.name
    this._props = opts.props
    this._adapter = opts.adapter
    this._store = opts.store
  }

  setAdapter(adapter) {
    this._adapter = adapter
  }
  setStore(store) {
    this._store = store
  }
  getAdapter() {
    return this._adapter || (this._store && this._store.getAdapter())
  }

  create(data) {
    return this.getAdapter().create(this.name, data).then(result=>{
      // result = new Record(result, { mapper:this })
      this.emit(`create`, result)
      return result
    })
  }
  createAll(data) {
    return this.getAdapter().createAll(this.name, data).then(results=>{
      // results = results.map(props=>new Record(props, { mapper:this }))
      this.emit(`createAll`, results)
      return results
    })
  }
  find(query) {
    return this.getAdapter().find(this.name, query).then(result=>{
      // result = new Record(result, { mapper:this })
      this.emit(`find`, result)
      return result
    })
  }
  findAll(query) {
    return this.getAdapter().findAll(this.name, query).then(results=>{
      // results = results.map(props=>new Record(props, { mapper:this }))
      this.emit(`findAll`, results)
      return results
    })
  }
  update(query, data) {
    return this.getAdapter().update(this.name, query, data).then(result=>{
      // result = new Record(result, { mapper:this })
      this.emit(`update`, result)
      return result
    })
  }
  updateAll(query, data) {
    return this.getAdapter().updateAll(this.name, query, data).then(results=>{
      // results = results.map(props=>new Record(props, { mapper:this }))
      this.emit(`updateAll`, results)
      return results
    })
  }
  delete(query) {
    return this.getAdapter().delete(this.name, query).then(_=>{
      this.emit(`delete`)
      return _
    })
  }
  deleteAll(query) {
    return this.getAdapter().deleteAll(this.name, query).then(_=>{
      this.emit(`deleteAll`)
      return _
    })
  }
}
