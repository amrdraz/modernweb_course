(function functionName({$injector}) {
  $injector.inject("$template", ["$compile", function ($compile) {
    // renders <h1>{{title}}</h1>
    // to <h1>Hello</h1> given scope {title:"Hello"}
    return (template, scope={}) => (
      template.replace(/\{\{([\w\[\]\.\+\-\d\/\*\%\&\|\!\(\)\,\"\']+)\}\}/gi, (match, parensMatch) => {
       if (scope[parensMatch]) {
         return scope[parensMatch];
       }
       return $compile(parensMatch)(scope);
      })
    )
  }])
})(window)
