import { LOAD_STATE } from './actionTypes'
import {
  ADD_LIST,
  REMOVE_LIST,
  LOAD_LISTS
} from './components/TodoListListContainer/actionTypes'

import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
  LOAD_ITEMS
} from './components/TodoListContainer/actionTypes'

import TodoListList from './components/TodoListListContainer/reducer'
import TodoList from './components/TodoListContainer/reducer'

export default (state = { todo_list_list:[], selected_list: undefined, items: []}, action) => {
  switch (action.type) {
    case LOAD_STATE:
      return action.state
    case ADD_LIST: case REMOVE_LIST: case LOAD_LISTS:
      return TodoListList(state, action)
    case ADD_ITEM: case REMOVE_ITEM: case UPDATE_ITEM: case LOAD_ITEMS:
      return {
        ...state,
        items: TodoList(state.items, action)
      }
    default: return state
  }
}
