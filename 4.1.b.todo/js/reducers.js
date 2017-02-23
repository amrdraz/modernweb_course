(function actions(global) {

  const LOAD_STATE = 'LOAD_STATE'
  const SELECT_LIST = 'SELECT_LIST'
  const ADD_LIST = 'ADD_LIST'
  const REMOVE_LIST = 'REMOVE_LIST'
  const ADD_ITEM = 'ADD_ITEM'
  const REMOVE_ITEM = 'REMOVE_ITEM'
  const TOGGLE_DONE_ITEM = 'TOGGLE_DONE_ITEM'

  global.reducers = {
    app(state = { todo_list_list:[], selected_list:-1 }, action){
      switch(action.type) {
        case LOAD_STATE:
          return action.state
        break;
        case SELECT_LIST: case ADD_LIST: case REMOVE_LIST:
          return Object.assign({}, state, reducers.todo_list_list(state, action))
        break;
        case ADD_ITEM: case REMOVE_ITEM: case TOGGLE_DONE_ITEM:
          return Object.assign({}, state, {
            todo_list_list: state.todo_list_list.map((todo_list, index)=>{
              if (index===state.selected_list) {
                return reducers.todo_list(todo_list, action)
              }
              return todo_list
            })
          })
        break;
        default:
          return state
      }
    },
    todo_list_list(state = {}, action){
      switch(action.type) {
        case SELECT_LIST:
          return Object.assign({}, state, {
            selected_list: reducers.SELECT_LIST(state, action)
          })
        break;
        case ADD_LIST:
          return Object.assign({}, state, {
            todo_list_list: reducers.ADD_LIST(state.todo_list_list, action),
            selected_list: reducers.SELECT_LIST(state, action)
          })
        break;
        case REMOVE_LIST:
          return Object.assign({}, state, {
            todo_list_list: reducers.REMOVE_LIST(state.todo_list_list, action),
            selected_list: reducers.SELECT_LIST(state, action)
          })
        break;
        default:
          return state
      }
    },
    SELECT_LIST({ todo_list_list = [], selected_list = -1 }, action){
      switch(action.type) {
        case SELECT_LIST:
          return action.index
        break;
        case ADD_LIST:
          return (todo_list_list.length < 0)?
                  0 : selected_list
        break;
        case REMOVE_LIST:
          return (todo_list_list.length <= selected_list)?
                  todo_list_list.length - 1 : selected_list
        default:
          return state
      }
    },
    ADD_LIST(todo_list_list = [], action){
      // equivilant to todo_list_list.push(action.list) but creates a new list
      // that is the concatination of the todo_list_list and the new list
      return todo_list_list.concat([action.list])
    },
    REMOVE_LIST(todo_list_list = [], action){
      let list = todo_list_list
      // create 2 new arrays one before the index
      // and concat it with one after the index by 1 element
      return list.slice(0, action.index).concat(list.slice(action.index + 1))
    },
    todo_list(todo_list = { title: 'default' }, action){
      switch(action.type) {
        case ADD_ITEM:
          return reducers.ADD_ITEM(todo_list, action)
        break;
        case REMOVE_ITEM:
          return reducers.REMOVE_ITEM(todo_list, action)
        break;
        case TOGGLE_DONE_ITEM:
          return Object.assign({}, todo_list, {
            items: reducers.todo_items(todo_list.items, action)
          })
        break;
        default:
          return todo_list
      }
    },
    ADD_ITEM(todo_list = { items: [] }, action){
      // create a new list state with new item array
      return Object.assign({}, todo_list, {
        // this is equivilant to items.concat([action.item])
        items: [...todo_list.items, action.item]
      })
    },
    REMOVE_ITEM(todo_list = { items: [] }, { index }){
      return Object.assign({}, todo_list, {
        // equivilant to: items.slice(0, index).concat(items.slice(index + 1))
        items: [...todo_list.items.slice(0, index), ...todo_list.items.slice(index + 1)]
      })
    },
    todo_items(items = [], action){
      switch(action.type) {
        case TOGGLE_DONE_ITEM:
          return items.map((item, i)=>{
            if (i===action.index) {
              return reducers.TOGGLE_DONE_ITEM(item, action)
            }
            return item
          })
        break;
        default: return items
      }
    },
    TOGGLE_DONE_ITEM(item = {}, { done }){
      // create a new item {}, then copy the old item in it, then overide done
      return Object.assign({}, item, { done })
    }
  }

})(window)
