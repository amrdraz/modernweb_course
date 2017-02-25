(function Obaserver(){
  
  let subscribers = {}
  let Observer = {
    // add a subscriber (a function)
    // to the array of subscribers to the event
    subscribe(event, subscriber) {
      if(!subscribers[event]) {
        subscribers[event] = []
      }
      subscribers[event].push(subscriber)
    },
    // remove a subscriber (a function)
    // from the array of subscribers of the event
    unsubscribe(event, subscriber) {
      if(subscribers[event].contains(subscriber)) {
        subscribers[event].splice(index, 1)
      }
    },
    // loop over array of functions subscribed to this event
    // and call them with arguments
    publish(event, ...args) {
        if(subscribers[event]) {
           subscribers[event].forEach(subscriber=>subscriber(...args))
        }
    }
  }
  Observer.trigger = Observer.dispatch = Observer.emit = Observer.publish
  Observer.on = Observer.subscribe
  Observer.off = Observer.unsubscribe

  global.Observer
})(window)
