(function(global) {
	const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
	const ARGUMENT_NAMES = /([^\s,]+)/g;

	/**
	 * Annotate is used to extract dependencies from the function\'s ARGUMENT NAMES
	 * instead of typing out the array
	 * example: annotate(function(a, b, c){}) === ['a', 'b', 'c']
	 * example: annotate(function(){}) === []
	 */
	function annotate(func) {
	  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
	  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	  if(result === null)
	     result = [];
	  return result;
	}

	global.$injector = {
		modules: {},
		providers: {},
		initAll() {
			Object.values(this.providers).forEach(
				provider=>this.init(provider.name)
			)
		},
		inject(moduleName,  constructor) {
      let dependencies = [];
			if (typeof constructor == 'function') {
				// it is possible to declare dependencies into a function
				// by attaching a $inject array after its decleration
				if (!(dependencies = constructor.$inject)) {
						dependencies = annotate(constructor)
				}
			} else if(Array.isArray(constructor)) {
        dependencies = constructor;
        constructor = dependencies.pop()
      }

      this.providers[moduleName] = {
				name: moduleName,
				dependencies,
				constructor,
				isInitialised: false,
				isInitialising: false
			}
		},
		get(moduleName){
			if (this.modules[moduleName]) {
				return this.modules[moduleName]
			} else if (this.providers[moduleName]){
				return this.init(moduleName)
			} else {
				throw new Error(`module ${moduleName} was not Injected`)
			}
		},
		init(moduleName, injectedDependencies) {
			let module = this.providers[moduleName]
			if (module.isInitialised && !injectedDependencies) {
				return this.modules[moduleName]
			}
			if (module.isInitialising) {
				throw new Error(`Circular dependency when initialising ${moduleName} while initialising dependency ${module.currentDependency}`)
			}
			module.isInitialising = true
			let deps = module.dependencies.map(
				dependency => {
					module.currentDependency = dependency
					return injectedDependencies[dependency] || this.init(dependency)
				}
			)
			delete module.currentDependency
			module.isInitialising = false
			module.isInitialised = true
			this.modules[moduleName] = module.constructor(...deps)
			return this.modules[moduleName]
		}
	}
})(window)
