const Mapper = require('../lib/data-mapper');
const NeDBAdapter = require('../lib/data-nedb-adapter');

module.exports = new Mapper({
  name: 'TodoList',
  props: {
    title: String,
    items: Array
  },
  adapter: new NeDBAdapter()
})
