import { connect } from 'react-redux'

import TodoListList from './components/TodoListList'
import {addList, removeList, selectList} from './actions'

const mapStateToProps = (state) => {
  return {
    todo_list_list: state.todo_list_list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addList(title) {
      dispatch(addList(title))
    },
    removeList(index) {
      dispatch(removeList(index))
    },
    selectList(index) {
      dispatch(selectList(index))
    }
  }
}

const TodoListListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListList)

export default TodoListListContainer
