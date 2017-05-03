
// You need to add the store to the __mocks__ folder in lib
const store = require('./lib/store');


exports.createList = (title) => {
  store.dispach({
    type: 'CREATE_LIST',
    list: {
      title,
      items: []
    }
  })
}
exports.removeList = (index) => {}
exports.selectList = (index) => {}
exports.addItem = (text) => {}
exports.removeItem = (index) => {}
exports.toggleItem = (index, done) => {}
