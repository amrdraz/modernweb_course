

(function store(global){
  let subscribers = []
  let _state = {}
  let didSetInitialState = false
  let _reducer = (state, action) => state

  let Store = {
    // add a subscriber (a function)
    subscribe(subscriber) {
      subscribers.push(subscriber)
    },
    setReducer(reducer) {
      _reducer = reducer
    },
    setInitialState(state){
      if(!didSetInitialState) {
        _state = state
        didSetInitialState = true
      }
    },
    dispatch(action){
      _state = _reducer(_state, action)
      subscribers.forEach(subscriber=>subscriber(_state))
    }
  }

  global.store = Store
})(window)
