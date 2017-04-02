import DS from './lib/data-store'
import MemoryAdapter from './lib/data-memory-adapter'
import localStorageAdapter from './lib/data-local-storage-adapter'

import TodoList from './data/TodoList'
import TodoItem from './data/TodoItem'


const Store = new DS({
  // create and use an http adapter instead
  adapter: new MemoryAdapter(),
  // adapter: new localStorageAdapter()
})

Store.registerMapper(TodoList)
Store.registerMapper(TodoItem)

window.DS = Store

export default Store
