
import {LOAD_STATE} from './actionTypes'

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


import TodoListList from './components/TodoListListContainer/reducers'
import TodoList from './components/TodoListContainer/reducers'

export default (state = { todo_list_list:[], selected_list: -1}, action) => {
  switch (action.type) {
    case LOAD_STATE:
      return action.state;
    case ADD_LIST: case REMOVE_LIST: case SELECT_LIST:
      return TodoListList(state, action)
    case ADD_ITEM: case REMOVE_ITEM: case TOGGLE_DONE_ITEM:
      let selectList = state.todo_list_list[state.selected_list]
      return selectList?({
        ...state,
        todo_list_list: state.todo_list_list.map((list, i) => (
          i===state.selected_list?TodoList(list, action):list
        ))
      }):state
    default: return state
  }
}

export const todoList = ({todo_list_list, selected_list}, action) => {
  return
}
