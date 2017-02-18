

(function(global){
  let events = {}
  let Observer = {
    publish(event, object) {
      events[event].forEach(function(subscriber){
        subscriber(object)
      })
    },
    subscribe(event, subscriber) {
      if (events[event]===undefined) {
        events[event] = []
      }
      events[event].push(subscriber)
    },
    unsubscribe(event, subscriber){
      if(events[event].indexOf(subscriber)!==-1) {
        events[event].splice((events[event].indexOf(subscriber)), 1)
      }
    }
  }
  Observer.trigger = Observer.dispatch = Observer.emit = Observer.publish;
  Observer.on = Observer.subscribe;
  Observer.off = Observer.unsubscribe;

  global.Observer = Observer;

})(window)
