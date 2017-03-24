
const REMOVE_LIST = 'REMOVE_LIST'
const SELECT_LIST = 'SELECT_LIST'
const CREATE_LIST = 'CREATE_LIST'

export default (state={}, action) => {
  return state
}

export const createList = (title) => {
  let {todo_list_list} = store.getState();
  return {
   type: CREATE_LIST,
   todo_list_list: [...todo_list_list, { title, items: [] }]
  }
}

export const selectList = (index) => {
  return {
    type: SELECT_LIST,
    selected_list: index
  }
}

export const removeList = (index) => {

  let prvState = store.getState();
  let todo_list_list = [...prvState.todo_list_list.slice(0, index), ...prvState.todo_list_list.slice(index + 1)]
  let selected_list = selected_list < index ? selected_list : selected_list - 1
  return {
    type: REMOVE_LIST,
    todo_list_list,
    selected_list
  }
}
