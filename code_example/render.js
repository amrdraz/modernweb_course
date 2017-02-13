(function(global){
  let {document, Object} = global;
  /**
   * vnode is of the form { tag, attributes, children } or a string
   */
  global.render = function (vnode) {
    if (typeof vnode==='string') return document.createTextNode(vnode);

    let n = document.createElement(vnode.nodeName);

    Object.keys(vnode.attributes || {}).forEach( k => n.setAttribute(k, vnode.attributes[k]) );

    (vnode.children || []).forEach( c => n.appendChild(render(c)) );

    return n;
  }

})(window)
