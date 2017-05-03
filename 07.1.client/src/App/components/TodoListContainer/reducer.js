
import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_DONE_ITEM,
} from './actionTypes.js'

export default (state = [], action) => {
  switch(action.type) {
    case ADD_ITEM:
      return addItem(state, action)
    case REMOVE_ITEM:
      return removeItem(state, action)
    case TOGGLE_DONE_ITEM:
      return toggleDone(state, action)
    default: return state
  }
}


export const addItem = (state = [], {item}) => {
  return [...state, item]
}
export const removeItem = (state = [], { id }) => {
  return  state.filter(item=>item.id!==id)
}
export const toggleDone = (state = [], action) => {
  return state.map((item)=>{
    if (item.id===action.item.id) {
      return action.item
    }
    return item
  })
}
