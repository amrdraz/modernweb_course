$injector.inject('store', function(){
  let state = {}
  let subscribers = []
  let reducer = (state, action) => state
  let store = {
    dispatch(action) {
      state = reducer(state, action)
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

  state = {
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
  store.setReducer((state={}, action)=>{
      let actionHandlers {
        'ADD_TODO_LIST': (state, {list})=> {
          state.todo_list_list = [...state.todo_list_list, list]
          return state
        },
        'REMOVE_TODO_LIST': (state, {index})=> {
          let oldList = state.todo_list_list
          state.todo_list_list = ([...oldList]).splice(index, 1)
          return state
        },
        'SELECT_TODO_LIST': (state, {index})=> {
          state.selected_list = index
          return state
        },
        'ADD_TODO_ITEM': (state, {item})=> {
          let items = state.todo_list_list[state.selected_list].items
          state.todo_list_list[state.selected_list].items = [...items, item]
          return state
        },
        'REMOVE_TODO_ITEM': (state, {index})=> {
          let items = state.todo_list_list[state.selected_list].items
          state.todo_list_list[state.selected_list].items = [...items]
          state.todo_list_list[state.selected_list].items.splice(index, 1)
          return state
        },
        'TOGGLE_TODO_ITEM': (state, {index, done})=> {
          let todo = state.todo_list_list[state.selected_list].items[index]
          state.todo_list_list[state.selected_list].items[index].done = done
          return state
        },
      }
      return actionHandlers[action.type]?actionHandlers[action.type](state, action):state
  })

  return store

})
