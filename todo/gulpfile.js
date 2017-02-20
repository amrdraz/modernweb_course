const fs = require(`fs`);
const gulp = require(`gulp`);
const browserSync = require(`browser-sync`).create();
// const clean = require(`gulp-clean`);
const usemin = require(`gulp-usemin`);
const babel = require(`gulp-babel`);
const browserify = require(`browserify`);

const tempDir = `.tmp`
const srcDir = `src`
const buildDir = `build`

const babelOptions = {
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
      `${srcDir}/*.html`
    ], ['reload'])
});

gulp.task(`bundle`, function() {
  return gulp.src(`${srcDir}/*.html`)
      .pipe(usemin({
        css: [ `concat` ],
        js: [ babel(babelOptions), `concat` ],
      }))
      .pipe(gulp.dest(tempDir))
})

gulp.task(`reload`, ['bundle'],function(done) {
  browserSync.reload()
  done()
})
