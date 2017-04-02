
import {
  ADD_LIST,
  REMOVE_LIST,
  SELECT_LIST,
} from './actionTypes'



export const addList = (list) => {
  return {
   type: ADD_LIST,
   list
  }
}

export const selectList = (list, items) => {
  return {
    type: SELECT_LIST,
    list,
    items
  }
}

export const removeList = (id) => {
  return {
    type: REMOVE_LIST,
    id
  }
}
