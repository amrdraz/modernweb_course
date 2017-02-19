(function main(global) {
  let {document, $injector} = global
  $injector.initAll()
  let App = $injector.get('App')
  let renderStateToHTML = $injector.get('renderer')
  let store = $injector.get('store')

  let itemReducer = (state={text:"",done:false}, action) => {
    switch(action.type) {
      case 'TOGGLE_TODO_ITEM'
      return state.done = action.done;
      break;
    }
    return state
  }

  store.setReducer((state={}, action)=>{
      let actions = {
        'ADD_TODO_LIST': ({list})=> {
          state.todo_list_list = [...state.todo_list_list, list]
        },
        'REMOVE_TODO_LIST': ({index})=> {
          let oldList = state.todo_list_list
          state.todo_list_list = ([...oldList]).splice(index, 1)
        },
        'SELECT_TODO_LIST': ({index})=> {
          state.selected_list = index
        },
        'ADD_TODO_ITEM': ({item})=> {
          let items = state.todo_list_list[state.selected_list].items
          state.todo_list_list[state.selected_list].items = [...items, item]
        },
        'REMOVE_TODO_ITEM': ({index})=> {
          let items = state.todo_list_list[state.selected_list].items
          state.todo_list_list[state.selected_list].items = [...items]
          state.todo_list_list[state.selected_list].items.splice(index, 1)
        },
        'TOGGLE_TODO_ITEM': ({index, done})=> {
          let todo = state.todo_list_list[state.selected_list].items[index]
          state.todo_list_list[state.selected_list].items[index].done = done
        },
      }
      return actions[action.type]?actions[action.type](action):store
  })

  store.subscribe(state=>{
    document.querySelector('#appContainer').innerHTML = App.render(state)
  })

  document.querySelector('#appContainer').innerHTML = App.render(store.getState())
  // renderStateToHTML(store.getState())

  global.TodoListList = $injector.get('TodoListList')
  global.TodoList = $injector.get('TodoList')
})(window)
