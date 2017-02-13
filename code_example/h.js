(function(global){
  global.h(nodeName, attributes, ...args) {
      let children = args.length ? [].concat(...args) : null;
      return { nodeName, attributes, children };
  }
})(window)
