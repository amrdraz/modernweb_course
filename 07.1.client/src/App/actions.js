import { LOAD_STATE } from './actionTypes'

export const loadState = (todo_list_list = [], selected_list = null, items = []) => ({
  type: LOAD_STATE,
  state: {
    todo_list_list,
    selected_list,
    items
  }
})
