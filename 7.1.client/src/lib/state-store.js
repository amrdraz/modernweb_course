import EventEmitter from './event-emitter'

export default class StateStore extends EventEmitter {
  constructor(reducer, initState) {
    super()
    this._state = initState?reducer(initState, {}):undefined
    this._reducer = reducer
  }
  getState() {
    return this._state
  }
  subscribe(subscriber) {
    this.on('update',  subscriber)
    return () => {
      this.off('update', subscriber)
    }
  }
  dispatch(action) {
    this._state = this._reducer(this._state, action)
    this.emit('update', this._state)
  }
}
