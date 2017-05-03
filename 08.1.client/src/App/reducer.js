import { LOAD_STATE } from './actionTypes'
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

export default (state = { todo_list_list:[], selected_list: undefined, items: []}, action) => {
  switch (action.type) {
    case LOAD_STATE:
      return action.state
    case ADD_LIST: case REMOVE_LIST: case SELECT_LIST:
      return TodoListList(state, action)
    case ADD_ITEM: case REMOVE_ITEM: case TOGGLE_DONE_ITEM:
      return {
        ...state,
        items: TodoList(state.items, action)
      }
    default: return state
  }
}
