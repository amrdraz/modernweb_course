
import {
  ADD_LIST,
  REMOVE_LIST,
  LOAD_LISTS,
} from './actionTypes.js'


export default (state = { todo_list_list: [], selected_list : null }, action) => {
  switch(action.type) {
    case LOAD_LISTS:
      return {
        ...state,
        todo_list_list: action.lists
      }
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
    default: return state
  }
}

export const addList = (state = { items: [], todo_list_list: [], selected_list : null }, { list }) => {
  const { todo_list_list } = state
  return {
    ...state,
    todo_list_list: [...todo_list_list, list],
  }
}
//
// export const selectList = (state = { todo_list_list: [], selected_list : null }, { list, items }) => {
//   return {
//     selected_list: list,
//     items: items
//   }
// }

export const removeList = (state = [], {id}) => {
  const { todo_list_list } = state
  let newList = todo_list_list.filter(list=> list.id!==id)
  return {
    todo_list_list: newList,
  }
}
