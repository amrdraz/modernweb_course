$injector.inject('store', function(){
  let state = {
    "todo_list_list": [
      {
        "title": "First List",
        "items": [
          {
            "text": "Somthing",
            "done": false
          },{
            "text": "Something else",
            "done": true
          }
        ]
      },
      {
        "title": "Second List",
        "items": [
          {
            "text": "item 1",
            "done": false
          },{
            "text": "item 2",
            "done": false
          }
        ]
      }
    ],
    "selected_list": 0
  }
  let subscribers = []
  let reducer = (state, action) => state

  return {
    dispatch(action) {
      store = reducer(state, action)
      subscribers.forEach(_=>_(state))
    },
    setReducer(r){
      reducer = r
    },
    getState() {
      return state
    },
    subscribe(subscriber) {
      subscribers.push(subscriber)
      return () => {
        let index = subscribers.indexOf(subscriber)
        subscribers.splice(index, 1)
      }
    }
  }

})
