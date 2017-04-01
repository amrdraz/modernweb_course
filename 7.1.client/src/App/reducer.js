
import {
  ADD_LIST,
  REMOVE_LIST,
  SELECT_LIST,
} from './components/TodoListListContainer/actionTypes'

import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_DONE_ITEM,
} from './components/TodoListContainer/actionTypes'

import TodoListList from './components/TodoListListContainer/reducer'
import TodoList from './components/TodoListContainer/reducer'

export default (state = { todo_list_list:[], selected_list: -1}, action) => {
  switch (action.type) {
    case ADD_LIST: case REMOVE_LIST: case SELECT_LIST:
      return TodoListList(state, action)
    case ADD_ITEM: case REMOVE_ITEM: case TOGGLE_DONE_ITEM:
      return {
        ...state,
        selected_list: TodoList(state.selected_list, action)
      }
    default: return state
  }
}
