
function hyperscript(type, props, ...children) {
  props = props || {} // make sure I have a props object
  children = children.length ? [].concat(...children) : []; // make sure we flatten arrays in children
  // handle custom components
  if (typeof type === 'function' || typeof type === 'object') {
    props.children = children // add children if any were passed to props
    return type['render']?type.render(props):type(props)
  }
  return { type, props, children };
}

function toString(node) {
  if (typeof node === 'string') {
    return node
  }
  return `<${node.type} ${Object.keys(node.props).map(prop=>`${prop}="${node.props[prop]}"`).join(' ')+' '}>
  ${node.children.map(toString)}
</node.type>`
}

exports.hyperscript = hyperscript
exports.renderString = toString
