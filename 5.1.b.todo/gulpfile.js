const fs = require(`fs`);
const gulp = require(`gulp`);
const sourcemaps = require(`gulp-sourcemaps`);
const browserSync = require(`browser-sync`).create();
// const clean = require(`gulp-clean`);
const usemin = require(`gulp-usemin`);
const babel = require(`gulp-babel`);
const browserify = require(`browserify`);

const tempDir = `.tmp`
const srcDir = `src`
const buildDir = `build`

const babelOptions = {
      // sourceMaps: 'inline',
      presets: [`es2015`],
      plugins: [
        [`transform-react-jsx`, {
          pragma: `hyperscript` // default pragma is React.createElement
        }]
      ]
  }

gulp.task(`default`, [ `serve` ])

gulp.task(`serve`, [`bundle`],() => {
    browserSync.init({
        server: {
            baseDir: tempDir
        }
    });
    gulp.watch([
      `${srcDir}/js/{*,**/*}.js`,
      `${srcDir}/css/{*,**/*}.css`,
      `${srcDir}/index.html`
    ], ['reload'])
});

let bundleFailed = false
gulp.task(`bundle`, function() {
  bundleFailed = false
  return gulp.src(`${srcDir}/index.html`)
      .pipe(usemin({
        css: [ `concat` ],
        js: [
          sourcemaps.init({
            loadMaps: true
          }),
          babel(babelOptions).on('error', swallowError),
          `concat`,
          sourcemaps.write('./')
        ],
      })).on('error', swallowError)
      .pipe(gulp.dest(tempDir))
})

gulp.task(`reload`, ['bundle'],function(done) {
  if(!bundleFailed) {
    browserSync.reload()
  }
  done()
})


function swallowError (error) {
  bundleFailed = true
  console.log(error)
  browserSync.notify(`
    <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:red;color:whit;font-weight:bold;font-size:2em;padding:10vh 10vw">
      An error occurred while building please checkout the terminal for more details
      <br>
      ${error}
    </div>
    `, 60000)
  this.emit('end')
}
