import MemoryAdapter from './data-memory-adapter'
import Mapper from './data-mapper'
import EventEmitter from './event-emitter'


export default class DataStore extends EventEmitter {

  constructor(config) {
    super()
    this._data = config.cashAdapter || new MemoryAdapter()
    this._name = config.name || "default"
    this._adapter = config.adapter || this._data
    this._mappers = {}
  }
  setAdapter(adapter) {
    this._adapter = adapter
  }
  getAdapter() {
    return this._adapter
  }
  registerMapper(mapper, opts) {
    mapper = mapper instanceof Mapper?mapper:new Mapper(mapper)
    mapper.setStore(this)
    return this._mappers[mapper.name] = mapper
  }
  getMapper(name) {
    return this._mappers[name]
  }

  create(name, data) {
    return this._mappers[name].create(data).then(_=>{
      this.emit(`mapper.${name}.create`, _)
      return _
    })
  }
  find(name, query) {
    return this._mappers[name].find(query).then(_=>{
      this.emit(`mapper.${name}.find`, _)
      return _
    })
  }
  findAll(name, query) {
    return this._mappers[name].findAll(query).then(_=>{
      this.emit(`mapper.${name}.findAll`, _)
      return _
    })
  }
  update(name, query, data) {
    return this._mappers[name].update(query, data).then(_=>{
      this.emit(`mapper.${name}.update`, _)
      return _
    })
  }
  delete(name, query) {
    return this._mappers[name].delete(query).then(_=>{
      this.emit(`mapper.${name}.delete`, _)
      return _
    })
  }

}
