(function(global, $compile){
  let angualrMatchRegex = /\{\{([\w\[\]\.\+\-\d\/\*\%\&\|\!\(\)\,\"\']+)\}\}/gi
  let templateStringRegex = /\$\{([\w\[\]\.\+\-\d\/\*\%\&\|\!\(\)\,\"\']+)\}/gi
  global.$template = (template, scope={}) => (
    template.replace(templateStringRegex, (match, parensMatch) => {
     if (scope[parensMatch]) {
       return scope[parensMatch];
     }
     return $compile?$compile(parensMatch)(scope):parensMatch;
    })
  )
})(window)
