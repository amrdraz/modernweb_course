const Mapper = require('../lib/data-mapper');
const NeDBAdapter = require('../lib/data-nedb-adapter');

module.exports = new Mapper({
  name: 'TodoItem',
  props: {
    text: String,
    done: Boolean
  },
  adapter: new NeDBAdapter()
})
