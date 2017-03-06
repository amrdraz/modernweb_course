jest.unmock('./store') ;

const store = require('./store');


test('should set reducer', () => {
  let state = null
  store.setReducer((state = {}, action) => state)
  store.dispach({})

});


test('should get state', () => {
  let state = null
  store.setReducer((state = {}, action) => state)
  store.dispach({})

});



test('should subscribe', () => {
  let state = null
  store.subscribe((state) => state)

});
