import { connect } from 'react-redux'

import TodoList from './components/TodoList'
import {addItem, removeItem, toggleDone} from './actions'

const mapStateToProps = (state) => {
  return {
    empty: state.selected_list>=0,
    items: state.selected_list>=0?state.todo_list_list[state.selected_list].items:[]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem(item) {
      dispatch(addItem(item))
    },
    removeItem: (index) => () => {
      dispatch(removeItem(index))
    },
    toggleDone: (index, done) => () => {
      dispatch(toggleDone(index, done))
    }
  }
}

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default TodoListContainer
