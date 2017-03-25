
import {
  ADD_LIST,
  REMOVE_LIST,
  SELECT_LIST,
} from './actionTypes'



export const addList = (title) => {
  return {
   type: ADD_LIST,
   list: { title, items: [] }
  }
}

export const selectList = (index) => {
  return {
    type: SELECT_LIST,
    index
  }
}

export const removeList = (index) => {
  return {
    type: REMOVE_LIST,
    index
  }
}
