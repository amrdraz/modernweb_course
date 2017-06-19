(function(global) {
	const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
	const ARGUMENT_NAMES = /([^\s,]+)/g;

	let $injector = {
		modules: {},
		providers: {},
		initAll(moduleNames) {
			if (!moduleNames) {
				moduleNames = Object.keys(this.providers)
			}
			return moduleNames.map( name => this.init(name) )
		},
		inject(moduleName,  module) {
      let {dependencies, constructor} = extractDependencies(module)

      this.providers[moduleName] = {
				name: moduleName,
				dependencies,
				constructor,
				isInitialised: false,
				isInitialising: false
			}
		},
		get(moduleName, injectedDependencies){
			if (this.modules[moduleName] && !injectedDependencies) {
				return this.modules[moduleName]
			} else if (this.providers[moduleName]){
				return this.init(moduleName, injectedDependencies)
			} else {
				throw new Error(`module ${moduleName} was not injected`)
			}
		},
		init(moduleName, injectedDependencies) {
			let module = this.providers[moduleName]
			if (!module) {
				throw new Error(`module ${moduleName} was not injected`)
			}
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
					return (injectedDependencies&&injectedDependencies[dependency])?injectedDependencies[dependency]:this.init(dependency)
				}
			)
			delete module.currentDependency
			module.isInitialising = false
			module.isInitialised = true
			module = module.constructor(...deps)
			if(!injectedDependencies) {
				this.modules[moduleName] = module
			}
			return module
		},
		run(module) {
			let {dependencies, constructor} = extractDependencies(module)
			constructor(...this.initAll(dependencies))
		}
	}
	$injector.define = $injector.inject
	$injector.inject = (...args) => {
		console.warn(`inject function is depricated use define instead`);
		$injector.define(...args)
	}

	global.$injector = $injector


		/**
		 * Annotate is used to exctract dependencies from the function\'s ARGUMENT NAMES
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

		/**
		 * Take a function or array and exctract the dependencies and constructor
		 * instead of typing out the array
		 * example: extractDependencies(function(a, b, c){}) === {dependencies: ['a', 'b', 'c'], constructor: function(a, b, c){} }
		 * example: extractDependencies(['a', 'b', 'c', function(a, b, c){}]) === {dependencies: ['a', 'b', 'c'], constructor: function(a, b, c){} }
		 * example: extractDependencies(function(){}) === {dependencies: [], constructor: function(){} }
		 * example: extractDependencies([function(){}]) === {dependencies: [], constructor: function(){} }
		 */
		function extractDependencies(constructor) {
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
			return {dependencies, constructor}
		}
})(window)
