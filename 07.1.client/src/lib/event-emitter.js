export default class EventEmitter {
  constructor() {
    this._events = {}
  }
  on(event, subscriber) {
    this._events[event] = this._events[event]  || []
    this._events[event].push(subscriber)
    return this
  }
  off(event, subscriber) {
    let index = this._events[event].indexOf(subscriber)
    if(~~index) {
      this._events[event].splice(index, 1)
    }
    return this
  }
  once(event, subscriber) {
    let once = (...args)=> { subscriber(...args); this.off(once) }
    this.on(event, once)
    return this
  }
  emit(event, ...args) {
    this._events[event] = this._events[event] || []
    this._events[event].forEach(subscriber=>subscriber(...args))
    return this
  }
}
