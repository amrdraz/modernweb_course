const fs = require('fs');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const babel = require('gulp-babel');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano')
const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const postcssplugins = [
  autoprefixer({browsers: ['last 1 version']}),
  nested,
  cssnano
];
const babelOptions = {
      presets: ['es2015'],
      plugins: [
        ["transform-react-jsx", {
          "pragma": "hyperscript" // default pragma is React.createElement
        }]
      ]
  }

const tempDir = '.tmp'
const buildDir = 'build'

gulp.task('default', [ 'serve' ])

gulp.task('bundle', function() {
  return gulp.src('app/*.html')
      .pipe(usemin({
        css: [ postcss(postcssplugins)],
        js: [ babel(babelOptions),'concat' ],
      }))
      .pipe(gulp.dest(tempDir))
})

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: tempDir
        }
    });
    gulp.watch([
      "app/js/{*,**/*}.js",
      "app/css/{*,**/*}.css",
      "app/*.html"
    ]).on("change", ['bundle', browserSync.reload])
});


gulp.task('js', () =>{
  return browserify('app/js/index.js', {debug:true})
    .transform('babelify', babelOptions)
    .bundle()
    .pipe(fs.createWriteStream("bundle.js"))
    .pipe(gulp.dest('.tmp/'))
})



gulp.task('build', [ 'clean', 'usemin' ])

gulp.task('clean', () => gulp.src('./dist', {read: false, force: true}).pipe(clean()))

gulp.task('usemin', () => gulp.src('./*.html')
    .pipe(usemin({
      css: [ postcss(postcssplugins), rev() ],
      js: [ babel(), uglify(), rev() ],
    }))
    .pipe(gulp.dest(buildDir))
)
