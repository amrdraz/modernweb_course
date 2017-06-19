(function TestRunner(global){

      let tests = {}
      let report = {}

      let addTest = (name, test) => tests[name] = test

      let assert = {}

      assert.pass = test => Object.assign({ passed:true, message:"Test Passed" }, test)
      assert.fail = test => Object.assign({ passed:false, message:"Test Failed" }, test)

      assert.equal = (test) => Object.assign({
        message: `expected ${test.expect} to equal ${test.actual}`,
        passed: test.expect===test.actual,
      }, test)

      assert.deepEqual = ({actual, expect}) => assert.equal({
        actual: JSON.stringify(actual),
        expect: JSON.stringify(expect)
      })

      assert.HTMLEqual = ({actual, expect}) => ({
        actual,
        expect,
        message: `HTML did not match`,
        passed: expect.replace(/[\s\n]+/g," ")===actual.replace(/[\s\n]+/g," "),
      })

      let runTests = () => {
        return Object.keys(tests).map(testKey=> {
          let result;
          try {
            result = tests[testKey]()
          } catch (error) {
            console.error(error)
            result = assert.fail({
              message: `An error occured while running ${testKey}`,
              error: error
            })
          }
          result.title = testKey
          return result
        })
      }

      let getReport = () => {
        let testResults = runTests()
        let passed = testResults.every(test=>test.passed)
        let passedCount = testResults.reduce((sum, test)=>test.passed?1:0, 0)
        let failedCount = testResults.length - passedCount
        return {
          testResults,
          passed,
          passedCount,
          failedCount
        }
      }

      let runAndRenderToHTML = (container, report) => {
        container.innerHTML = reportRenderToHTML(report)
      }

      let reportRenderToHTML = report => `
        <header class="header row primary-bg-color">
          <h1 class="header__title">${report.passed?'All Tests Passed':`${report.failedCount} Test Failed`}</h1>
        </header>
        ${report.testResults.map(test=>`
          ${test.passed?`
            <div class="row test test--passed">
              <h3>${test.title} Passed</h3>
            </div>
          `:`
            <div class="col test test--failed">
              <h3>${test.title} Failed</h3>
              ${test.error?`
                <p>${test.message}</p>
                <pre>${test.error}</pre>
              `:`
                <p>${escapeHTMLString(test.message)}</p>
                <h4>Expected</h4>
                <pre>${escapeHTMLString(test.expect)}</pre>
                <h4>Actual</h4>
                <pre>${escapeHTMLString(test.actual)}</pre>
              `}
            </div>
          `}
        `).join("")}
      `

      let escapeHTMLString = (html) => html.replace(/(?:<(\w+)\s)|(?:<\/(\w+>))/gm, (m,p)=>`<<i></i>${p} `)

      global.TestRunner = {
        addTest,
        assert,
        getReport,
        runAndRenderToHTML
      }

})(window)
