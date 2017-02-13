(function(global) {
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
      if(Array.isArray(constructor)) {
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
		init(moduleName) {
			let module = this.providers[moduleName]
			if (module.isInitialised) {
				return this.modules[moduleName]
			}
			if (module.isInitialising) {
				throw new Error(`Circular dependency when initialising ${moduleName} while initialising dependency ${module.currentDependency}`)
			}
			module.isInitialising = true
			let deps = module.dependencies.map(
				dependency => {
					module.currentDependency = dependency
					return this.init(dependency)
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
