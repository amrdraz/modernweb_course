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

gulp.task('default', [ 'serve' ])

gulp.task('js', () =>{
  return browserify('browserify.js')
})

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./.tmp"
        }
    });
    gulp.watch([
      "js/{*,**/*}.js",
      "css/{*,**/*}.css",
      "*.html"
    ]).on("change", browserSync.reload)
});

gulp.task('build', [ 'clean', 'usemin' ])

gulp.task('clean', () => gulp.src('./dist', {read: false, force: true}).pipe(clean()))

gulp.task('usemin', () => gulp.src('./*.html')
    .pipe(usemin({
      css: [ postcss(postcssplugins), rev() ],
      js: [ babel({
            presets: ['es2015']
            plugins: [
              ["transform-react-jsx", {
                "pragma": "dom" // default pragma is React.createElement
              }]
            ]
        }), uglify(), rev() ],
    }))
    .pipe(gulp.dest('build/'))
)
