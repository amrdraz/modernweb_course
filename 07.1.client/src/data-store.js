import DS from './lib/data-store'
import MemoryAdapter from './lib/data-memory-adapter'
import localStorageAdapter from './lib/data-local-storage-adapter'

import TodoList from './data/TodoList'
import TodoItem from './data/TodoItem'


const Store = new DS({
  adapter: new MemoryAdapter(),
  // adapter: new localStorageAdapter()
  // create and use an http adapter instead
  // create and use an indexDB adapter https://github.com/localForage/localForage
  // what about an adapter that uses http but uses indexDB for caching
})

Store.registerMapper(TodoList)
Store.registerMapper(TodoItem)

window.DS = Store

export default Store
