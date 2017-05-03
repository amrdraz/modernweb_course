
import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
  LOAD_ITEMS
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
export const updateItem = (item) => {
  return {
    type: UPDATE_ITEM,
    item
  }
}
export const loadItems = (items) => {
  return {
    type: LOAD_ITEMS,
    items
  }
}
