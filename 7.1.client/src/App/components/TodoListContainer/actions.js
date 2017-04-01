
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
export const removeItem = (index) => {
  return {
    type: REMOVE_ITEM,
    index
  }
}
export const toggleDone = (index, done) => {
  return {
    type: TOGGLE_DONE_ITEM,
    index,
    done
  }
}
