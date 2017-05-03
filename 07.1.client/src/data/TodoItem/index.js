import Mapper from '~/src/lib/data-mapper'

export default new Mapper({
  name: 'TodoItem',
  props: {
    text: String,
    done: Boolean
  }
})
