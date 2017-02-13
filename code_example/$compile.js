(function(global){
  global.$compile = compile;
  function $compile(src) {
    src = 'with (sandbox) {return ' + src + '}'
    const code = new Function('sandbox', src)

    return function (sandbox) {
      if (!sandboxProxies.has(sandbox)) {
        const sandboxProxy = new Proxy(sandbox, {has, get})
        sandboxProxies.set(sandbox, sandboxProxy)
      }
      return code(sandboxProxies.get(sandbox))
    }
  }

  function has (target, key) {
    return true
  }

  function get (target, key) {
    if (key === Symbol.unscopables) return undefined
    return target[key]
  }

})(window)
