

(function(global){
  let events = {
    action: [HandleAction]
  }
  let Observer = {
   publish(event, object){
     let subscribers = events[event]
     subscribers.forEach(function(fn){
       fn(object)
     })
   },
   // Observer.subscribe('click', ()=> {})
   subscribe(event, subscriber){
     if(events[event]===undefined) {
       events[event] = [] // subscribers
     }
     events[event].push(subscriber)
   },
   unsubscribe(event, subscriber){
      let index = events[event].indexOf(subscriber)
      if(index!==-1){
        events[event].splice(index, 1)
      }
   }
  }
  Observer.trigger = Observer.emit = Observer.publish;
  Observer.on = Observer.subscribe;
  Observer.off = Observer.unsubscribe;

  global.Observer = Observer;

})(window)
