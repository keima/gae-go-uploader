gulp = require "gulp"
inject = require "gulp-inject"
bower = require("bower-files")()
runSequence = require "run-sequence"
angularFileSort = require "gulp-angular-filesort"
browserSync = require 'browser-sync'
sort = require "sort-stream"
debug = require 'gulp-debug'

$app = "./app/"
setting =
  src: $app
  lib: $app + "libraries/"
  font: $app + "fonts/"

  html: $app + '**/*.html'
  js: $app + 'scripts/**/*.js'
  css: $app + 'styles/**/*.css'

##################################
# Task
##################################

gulp.task 'default', ['serve']
gulp.task 'serve', ['browser-sync', 'watch']

gulp.task 'browser-sync', ->
  # goapp serve してから
  browserSync proxy: 'localhost:8080'

gulp.task 'watch', ->
  gulp.watch 'bower.json', ['bower-inject']
  gulp.watch setting.html, [browserSync.reload]
  gulp.watch setting.js, ["inject", browserSync.reload]
  gulp.watch setting.css, ['css']

gulp.task 'css', ->
  gulp.src(setting.css).pipe browserSync.reload(stream: true)

gulp.task 'bower-inject', ->
  runSequence 'bower', 'inject'

gulp.task 'bower', ->
  jsLib = bower.ext('js').files
  cssLib = bower.ext('css').files
  swfLib = bower.ext('swf').files
  fontLib = bower.join({fonts: ['eot', 'woff', 'svg', 'ttf']}).files

  gulp.src(jsLib)
  .pipe debug()
  .pipe gulp.dest(setting.lib)
  gulp.src(cssLib).pipe gulp.dest(setting.lib)
  gulp.src(swfLib).pipe gulp.dest(setting.lib)
  gulp.src(fontLib).pipe gulp.dest(setting.font)

gulp.task 'inject', ->
  target = gulp.src(setting.src + 'index.html')

  bowerComponents = bower.join({fonts: ['eot', 'woff', 'svg', 'ttf']})

  bowerJs = gulp.src(bowerComponents.ext('js').files)
  bowerCss = gulp.src(bowerComponents.ext('css').files)
  others = gulp.src [
    setting.src + 'scripts/**/*.js',
    setting.src + 'styles/**/*.css'
  ]

  option = (name) ->
    ret = {relative: true}
    if name
      ret.name = name
    return ret

  target
  .pipe inject(bowerJs, option("bower"))
  .pipe inject(bowerCss, option("bower"))
  .pipe inject(others, option())
  .pipe gulp.dest(setting.src)


gulp.task 'playground', ->
  gulp.src bower()
