gulp = require "gulp"
$ = require('gulp-load-plugins')() # injecting gulp-* plugin
inject = require "gulp-inject"
runSequence = require "run-sequence"
bs = require 'browser-sync'
browserify = require 'browserify'
watchify = require 'watchify'
wpCore = require 'webpack'
webpack = require 'webpack-stream'
rimraf = require "rimraf"
source = require 'vinyl-source-stream'

##################################
# Configuration
##################################

$app = "./app/"
$dest = "../src/static/"

setting =
  index: $app + "index.html"
  entriesjs: $app + "scripts/app.js"

  outputjs: "app.build.js"
  vendorcss: "vendor.css"
  appcss: "app.css"

  html: $app + '**/*.html'
  js: $app + 'scripts/**/*.js'
  css: $app + 'styles/**/*.css'

  watching: false

  copy: [
    "./app/favicon.ico",
    "./node_modules/components-font-awesome/{fonts,_}/*"
  ]

##################################
# Task
##################################

gulp.task 'default', ['serve']

gulp.task 'serve', (cb) ->
  runSequence "build", 'browser-sync', 'watch', cb

gulp.task 'browser-sync', ->
# goapp serve してから
  bs proxy: 'localhost:8080'

gulp.task "setWatch", ->
  setting.watching = true

gulp.task 'watch', ["setWatch"], ->
  gulp.watch setting.index, ["usemin"]
  .on "change", (changedFile) ->
    $.util.log changedFile.path
    bs.reload

  gulp.watch setting.css, ["inject"]
  .on "change", (changedFile) ->
    $.util.log changedFile.path
    gulp.src(changedFile.path)
    .pipe bs.reload(stream: true)

  gulp.watch setting.js, ["webpack"]
  .on "change", (changedFile) ->
    $.util.log changedFile.path
    bs.reload


gulp.task "browserify", ->
  b = browserify(
    entries: [setting.entriesjs]
    cache: {}
    packageCache: {}
    fullPaths: false
    debug: setting.watching
  )

  if setting.watching
    b.plugin(watchify)

  bundle = ->
    b.bundle()
    .pipe source setting.outputjs
    .pipe gulp.dest $dest

  if setting.watching
    b.on "update", bundle
    b.on "log", console.log

  bundle()


gulp.task "webpack", ->
  wp = webpack(
    output: {filename: setting.outputjs}
    module: {
      loaders: []
    }
    plugins: [
      new wpCore.ProvidePlugin({
        "window.jQuery": "jquery"
      })
    ]
    devtool: 'source-map'
  )

  if setting.watching
    wp.on "error", $.util.log

  gulp.src setting.entriesjs
  .pipe wp
  .pipe gulp.dest $dest


gulp.task "inject", ->
  css = gulp.src setting.css, read: false

  gulp.src setting.index
  .pipe $.inject css, {ignorePath: 'app', addRootSlash: false}
  .pipe gulp.dest $app

gulp.task "usemin", ->
  cssTask = (files, filename) ->
    if files?
      files.pipe $.pleeease(
        import: false
        rebaseUrls: false
        autoprefixer: {browsers: ["last 4 versions", "ios 6", "android 4.0"]}
        out: $dest + filename
      )
      .pipe $.concat(filename)
  #      .pipe $.rev()

  gulp.src setting.index
  .pipe $.spa.html(
    assetsDir: $app
    pipelines:
      main: (files) ->
        if !setting.watching
          files.pipe $.minifyHtml(empty: true, conditionals: true)
        else
          files
      vendorcss: (files)->
        cssTask files, setting.vendorcss
      css: (files)->
        cssTask files, setting.appcss
  )
  .pipe gulp.dest $dest

gulp.task 'copy', ->
  gulp.src setting.copy
  .pipe gulp.dest $dest

#gulp.task 'copyPartials', ->
#  gulp.src config.partials, {base: config.dir}
#  .pipe $.minifyHtml(empty: true)
#  .pipe gulp.dest $dest

gulp.task 'clean', (cb) ->
  rimraf($dest, cb);

gulp.task "build", (cb) ->
  runSequence "clean", ["inject", "webpack"], "usemin", "copy", cb
