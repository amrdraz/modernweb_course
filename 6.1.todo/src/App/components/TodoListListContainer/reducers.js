
import {
  ADD_LIST,
  REMOVE_LIST,
  SELECT_LIST,
} from './actionTypes.js'


export default (state = { todo_list_list: [], selected_list :-1 }, action) => {
  switch(action.type) {
    case ADD_LIST:
      return {
        ...state,
        ...addList(state, action)
      }
    case REMOVE_LIST:
    return {
      ...state,
      ...removeList(state, action)
    }
    case SELECT_LIST:
      return {
        ...state,
        ...selectList(state, action)
      }
    default: return state
  }
}

export const addList = (state = { todo_list_list: [], selected_list :-1 }, { list }) => {
  const { todo_list_list, selected_list } = state
  return {
    todo_list_list: [...todo_list_list, list],
    selected_list: todo_list_list.length
  }
}

export const selectList = (state = { todo_list_list: [], selected_list :-1 }, { index }) => {
  const { todo_list_list, selected_list } = state
  return {
    selected_list: index
  }
}

export const removeList = (state = [], {index}) => {
  const { todo_list_list, selected_list } = state
  return {
    todo_list_list: [...todo_list_list.slice(0, index), ...todo_list_list.slice(index + 1)],
    selected_list: selected_list<index?selected_list:selected_list-1
  }
}
