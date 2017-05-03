import { createStore } from 'redux'
import reducer from './App/reducers';

const store = createStore(reducer, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
