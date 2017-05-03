const actions = require('actions');


test('creatList should return a create List action',  () => {
  expect(actions.creatList("New List")).toEqual({
    type: 'CREATE_LIST',
    list: {
      title: 'New List',
      items: []
    }
  });
});

// Do the REST
