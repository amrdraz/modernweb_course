(function functionName(global) {

  const createElement = (node) => {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children
      .map(createElement)
      .forEach($el.appendChild.bind($el));
    return $el;
  }
  
  global.vdom = {
    createElement
  }
})(window)
