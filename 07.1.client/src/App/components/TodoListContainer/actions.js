
import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_DONE_ITEM,
} from './actionTypes'


export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item
  }
}
export const removeItem = (id) => {
  return {
    type: REMOVE_ITEM,
    id
  }
}
export const toggleDone = (item) => {
  return {
    type: TOGGLE_DONE_ITEM,
    item
  }
}
