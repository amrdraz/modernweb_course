import Mapper from '~/src/lib/data-mapper'

export default new Mapper({
  name: 'TodoList',
  props: {
    title: String,
    items: Array
  }
})
