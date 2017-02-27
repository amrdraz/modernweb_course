(function renderer(global) {

  const { updateElement } = global

  let old_vdom;
  function renderHTML(container, new_vdeom) {
    updateElement(container, new_vdeom, old_vdom)
    old_vdom = new_vdeom
  }

  global.renderHTML = renderHTML

})(window)
