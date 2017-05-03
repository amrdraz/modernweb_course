const EventEmitter = require('./event-emitter')
module.exports = class Record extends Proxy {
  constructor(props, opts) {
    super(new EventEmitter(), {
      get(target, key) {
        return target._props[key]?target._props[key]:target[key]
      },
      set(target, key, val) {
        return target._props[key]?(target._props[key] = val):(target[key]=val)
      }
    })
    this._mapper = opts.mapper
    this._adapter = opts.adapter || opts.mapper.adapter
    this._props = props
  }

  setAdapter(adapter) {
    this._adapter = adapter
  }
  getAdapter(adapter) {
    return this._adapter || this.mapper.getAdapter()
  }
  setProps(props) {
    this._props = props
    return this
  }
  getProps() {
    return this._props
  }

  save() {
    if (this.id) {
      return this.getAdapter().create(this._mapper.name, this._props).then(_=>this.setProps(_))
    } else {
      return this.getAdapter().update(this._mapper.name, this.id, this._props).then(_=>this.setProps(_))
    }
  }
  reload() {
    return this.getAdapter().find(this._mapper.name, this.id).then(_=>this.setProps(_))
  }
  delete(data) {
    return this.getAdapter().delete(this._mapper.name, this.id, data).then(_=>this.setProps(destroyedProps))
  }
}

const destroyedProps = new Proxy({}, {
  get() { throw Error('This Record has ben destroyed') },
  set() { throw Error('This Record has ben destroyed') }
})
