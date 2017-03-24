
  //
  //   todo_list_list(state = {}, action){
  //     switch(action.type) {
  //       case SELECT_LIST:
  //         return Object.assign({}, state, {
  //           selected_list: reducers.SELECT_LIST(state, action)
  //         })
  //       break;
  //       case ADD_LIST:
  //         return Object.assign({}, state, {
  //           todo_list_list: reducers.ADD_LIST(state.todo_list_list, action),
  //           selected_list: reducers.SELECT_LIST(state, action)
  //         })
  //       break;
  //       case REMOVE_LIST:
  //         return Object.assign({}, state, {
  //           todo_list_list: reducers.REMOVE_LIST(state.todo_list_list, action),
  //           selected_list: reducers.SELECT_LIST(state, action)
  //         })
  //       break;
  //       default:
  //         return state
  //     }
  //   },
  //   todo_list(todo_list = { title: 'default' }, action){
  //     switch(action.type) {
  //       case ADD_ITEM:
  //         return reducers.ADD_ITEM(todo_list, action)
  //       break;
  //       case REMOVE_ITEM:
  //         return reducers.REMOVE_ITEM(todo_list, action)
  //       break;
  //       case TOGGLE_DONE_ITEM:
  //         return Object.assign({}, todo_list, {
  //           items: reducers.todo_items(todo_list.items, action)
  //         })
  //       break;
  //       default:
  //         return todo_list
  //     }
  //   },
  //   todo_items(items = [], action){
  //     switch(action.type) {
  //       case TOGGLE_DONE_ITEM:
  //         return items.map((item, i)=>{
  //           if (i===action.index) {
  //             return reducers.TOGGLE_DONE_ITEM(item, action)
  //           }
  //           return item
  //         })
  //       break;
  //       default: return items
  //     }
  //   },
  //   SELECT_LIST({ todo_list_list = [], selected_list = -1 }, action){
  //     switch(action.type) {
  //       case SELECT_LIST:
  //         return action.index
  //       break;
  //       case ADD_LIST:
  //         return (todo_list_list.length < 0)?
  //                 0 : selected_list
  //       break;
  //       case REMOVE_LIST:
  //         return (todo_list_list.length <= selected_list)?
  //                 todo_list_list.length - 1 : selected_list
  //       default:
  //         return state
  //     }
  //   },
  //   ADD_LIST(todo_list_list = [], action){
  //     return todo_list_list.concat([action.list])
  //   },
  //   REMOVE_LIST(todo_list_list = [], action){
  //     let list = todo_list_list
  //     return list.slice(0, action.index).concat(list.slice(action.index + 1))
  //   },
  //   ADD_ITEM(todo_list = { items: [] }, action){
  //     return Object.assign({}, todo_list, {
  //       items: [...todo_list.items, action.item]
  //     })
  //   },
  //   REMOVE_ITEM(todo_list = { items: [] }, { index }){
  //     return Object.assign({}, todo_list, {
  //       items: [...todo_list.items.slice(0, index), ...todo_list.items.slice(index + 1)]
  //     })
  //   },
  //   TOGGLE_DONE_ITEM(item = {}, { done }){
  //     return Object.assign({}, item, { done })
  //   }
  // }
