
import {
  ADD_LIST,
  REMOVE_LIST,
  SELECT_LIST,
  LOAD_LISTS,
} from './actionTypes'



export const addList = (list) => {
  return {
   type: ADD_LIST,
   list
  }
}

export const loadLists = (lists) => {
  return {
   type: LOAD_LISTS,
   lists
  }
}

export const selectList = (list) => {
  return {
    type: SELECT_LIST,
    url: `/${list.id}`
  }
}

export const removeList = (id) => {
  return {
    type: REMOVE_LIST,
    id
  }
}
