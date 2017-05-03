(function tests(global){
    let {TestRunner, document} = global
    let container = document.querySelector('#testContainer')
    let report = TestRunner.getReport()
    TestRunner.runAndRenderToHTML(container, report)
})(window)
