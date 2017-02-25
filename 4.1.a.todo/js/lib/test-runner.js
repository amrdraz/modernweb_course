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
        passed: expect.replace(/[\s]+/gm," ")===actual.replace(/[\s]+/gm," "),
      })

      let runTests = () => {
        return Object.keys(tests).map(testKey=> {
          let result;
          try {
            result = tests[testKey]()
          } catch (error) {
            result = assert.fail({
              message: `An error occured while running ${testKey}`,
              error: error
            })
          }
          if(result) {
            result.title = testKey
            return result
          } else {
            assert.fail({
              message: `You forgot to return an assertion for ${testKey}`,
            })
          }
        })
      }

      let getReport = () => {
        let testResults = runTests()
        let passed = testResults.every(test=>test.passed)
        let passedCount = testResults.reduce((sum, test)=>test.passed?++sum:sum, 0)
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
        `).join('')}
      `

      let escapeHTMLString = (html) => html?html.replace(/(?:<(\w+)\s)|(?:<\/(\w+>))/gm, (m, p, p2)=>p?`<<i></i>${p} `:p2?`<<i></i>/${p2}`:''):html

      global.TestRunner = {
        addTest,
        assert,
        getReport,
        runAndRenderToHTML
      }

})(window)
