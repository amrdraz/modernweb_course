$injector.inject('actionHandlers', function(){
  let actionHandlers = {
    'ADD_TODO_LIST': (state, {list})=> {
      state.todo_list_list = [...state.todo_list_list, list]
    },
    'REMOVE_TODO_LIST': (state, {index})=> {
      let oldList = state.todo_list_list
      state.todo_list_list = ([...oldList]).splice(index, 1)
    },
    'SELECT_TODO_LIST': (state, {index})=> {
      state.selected_list = index
    },
    'ADD_TODO_ITEM': (state, {item})=> {
      let items = state.todo_list_list[state.selected_list].items
      state.todo_list_list[state.selected_list].items = [...items, item]
    },
    'REMOVE_TODO_ITEM': (state, {index})=> {
      let items = state.todo_list_list[state.selected_list].items
      state.todo_list_list[state.selected_list].items = [...items]
      state.todo_list_list[state.selected_list].items.splice(index, 1)
    },
    'TOGGLE_TODO_ITEM': (state, {index, done})=> {
      let todo = state.todo_list_list[state.selected_list].items[index]
      state.todo_list_list[state.selected_list].items[index].done = done
    }
  }
  return actionHandlers
})
