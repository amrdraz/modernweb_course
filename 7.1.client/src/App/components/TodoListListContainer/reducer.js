
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
  const { todo_list_list } = state
  return {
    todo_list_list: [...todo_list_list, list],
    selected_list: list
  }
}

export const selectList = (state = { todo_list_list: [], selected_list :-1 }, { list }) => {
  return {
    selected_list: list
  }
}

export const removeList = (state = [], {id}) => {
  const { todo_list_list, selected_list } = state
  let newList = todo_list_list.filter(list=> list.id!==id)
  return {
    todo_list_list: newList,
    selected_list: selected_list.id!==id?selected_list:(newList.length?newList[0]:null)
  }
}
