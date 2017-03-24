
import {
  LOAD_STATE,
  SELECT_LIST,
  ADD_LIST,
  REMOVE_LIST,
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_DONE_ITEM,
} from '~/App/actionTypes.js'

import todo_lists_list from './components/TodoListList/reducers'


const App = combineReducers({
  todo_lists,
  selected_list
})

function selected_list(state = -1, action){
  switch(action.type) {
    case LOAD_STATE:
      return action.state.selected_list
    case SELECT_LIST:
      return action.index
    break;
    case ADD_LIST:
      return state===-1?0:state
    break;
    case REMOVE_LIST:
      return action.index>state?state:state-1
    default:
      return state
  }
}

function todo_list_list(state = [], action) {
    switch(action.type) {
      case LOAD_STATE:
        return action.state.todo_list_list
      break;
      case ADD_LIST: case REMOVE_LIST:
        return todo_lists_list(state, action)
      break;
      case ADD_ITEM: case REMOVE_ITEM: case TOGGLE_DONE_ITEM:
        return Object.assign({}, state, {
          todo_list_list: state.todo_list_list.map((todo_list, index)=>{
            if (index===state.selected_list) {
              return reducers.todo_list(todo_list, action)
            }
            return todo_list
          })
        })
      break;
      default:
        return state
    }
  }
}

export default App;
