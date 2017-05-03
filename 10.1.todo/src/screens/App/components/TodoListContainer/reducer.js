
import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
  LOAD_ITEMS
} from './actionTypes.js'

export default (state = [], action) => {
  switch(action.type) {
    case LOAD_ITEMS:
      return action.items
    case ADD_ITEM:
      return addItem(state, action)
    case REMOVE_ITEM:
      return removeItem(state, action)
    case UPDATE_ITEM:
      return updateItem(state, action)
    default: return state
  }
}


export const addItem = (state = [], {item}) => {
  return [...state, item]
}
export const removeItem = (state = [], { id }) => {
  return  state.filter(item=>item.id!==id)
}
export const updateItem = (state = [], action) => {
  return state.map((item)=>{
    if (item.id===action.item.id) {
      return action.item
    }
    return item
  })
}
