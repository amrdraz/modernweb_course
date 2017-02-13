

(function(global){
  let events = {}
  let Observer = {
    publish(event, object) {
      events[event].forEach(function(callback){
        callback(object)
      })
    },
    subscribe(event, callback) {
      if (events[event]===undefined) {
        events[event] = []
      }
      events[event].push(callback)
    },
    unsubscribe(event, callback){
      if(events[event].indexOf(callback)!==-1) {
        events[event].splice((events[event].indexOf(callback)), 1)
      }
    }
  }
  Observer.emit = Observer.publish;
  Observer.on = Observer.subscribe;
  Observer.off = Observer.unsubscribe;

  global.Observer = Observer;

})(window)
