import StateStore from './lib/state-store'
import reducer from './App/reducer'

const Store = new StateStore(reducer)
window.Store = Store
export default Store
