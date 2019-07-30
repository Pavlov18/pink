"use strict";
var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var jsmin = require("gulp-uglyfly");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var del = require("del");
var include = require("posthtml-include");
var csso = require("gulp-csso");
var htmlmin = require("gulp-htmlmin");

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))

    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("script", function () {
  return gulp.src("source/js/**/*.js")
    .pipe(plumber())
    // .pipe(jsmin())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build/js"))
});

gulp.task("imagemin", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/{icon,spr}-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
    ]))
  .pipe(gulp.dest("build"));
});

gulp.task("minifyhtml", () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/*/normalize.css"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/**/*.js", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/**/*.js", gulp.series("script", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));

});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

// gulp.task("build", gulp.series("clean", "copy", "css", "imagemin", "sprite", "webp", "html", "script"));
gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "webp", "html", "script"));
gulp.task("start", gulp.series("build", "server"));