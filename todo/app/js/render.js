(function functionName(global) {
  let render = (vnode) => {
    if(vnode.nodeName)
    return `<${vnode.nodeName} ${Object.keys(vnode.attributes).map(name=>`${name}="${vnode.attributes[name]}"`).join(" ")}>
      ${vnode.children.map(render)}
    </${vnode.nodeName}>`
  }
  global.renderHTML = render;
})(window)
