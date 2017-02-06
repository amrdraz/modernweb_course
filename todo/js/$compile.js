(function functionName({$injector}) {
  $injector.inject("$compile", function () {
      // from https://blog.risingstack.com/writing-a-javascript-framework-sandboxed-code-evaluation/
      const sandboxProxies = new WeakMap()

      return compileCode;

      function compileCode (src) {
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
  })
})(window)
