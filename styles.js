const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const gcmq = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const stylelint = require('gulp-stylelint');
const rename = require('gulp-rename');
const { server } = require("./gulpfile");
function styles() {
  return src('src/sass/styles.scss')
    .pipe(plumber())
    .pipe(stylelint({
      reporters: [{ formatter: 'string', console: true }],
    }))
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gcmq())
    .pipe(dest('build/css'))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(dest('build/css'))
    .pipe(server.stream());
}
exports.styles = styles;
