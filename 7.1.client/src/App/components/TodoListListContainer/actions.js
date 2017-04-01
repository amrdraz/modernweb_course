
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

export const selectList = (list) => {
  return {
    type: SELECT_LIST,
    list
  }
}

export const removeList = (id) => {
  return {
    type: REMOVE_LIST,
    id
  }
}
