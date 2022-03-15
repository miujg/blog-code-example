const { series, src, dest } = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')

function compiler() {
  return src('./src/*.scss')
  .pipe(sass.sync())
  .pipe(autoprefixer({}))
  .pipe(cssmin())
  .pipe(dest('./lib')) // 生成结果
}

function copyfont() { // 拷贝字体样式
  return src('./src/fonts/**').pipe(cssmin()).pipe(dest('./lib/fonts'))
}

exports.build = series(compiler, copyfont)