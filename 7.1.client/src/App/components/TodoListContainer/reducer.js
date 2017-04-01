
import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_DONE_ITEM,
} from './actionTypes.js'

export const addItem = (state = [], {item}) => {
  return [...state, item]
}
export const removeItem = (state = [], { index }) => {
  return  [...state.splice(0, index), ...state.splice(index + 1)]
}
export const toggleDone = (state = [], {index, done}) => {
  return state.map((item, i)=>{
    if (i===index) {
      return {...item, done: !done}
    }
    return item
  })
}

export default (todo_list={title: "default", items:[]}, action) => {
  switch(action.type) {
    case ADD_ITEM:
      return Object.assign({}, todo_list, {
        items: addItem(todo_list.items, action)
      })
    case REMOVE_ITEM:
      return Object.assign({}, todo_list, {
        items: removeItem(todo_list.items, action)
      })
    case TOGGLE_DONE_ITEM:
      return Object.assign({}, todo_list, {
        items: toggleDone(todo_list.items, action)
      })
    default: return todo_list
  }
}
