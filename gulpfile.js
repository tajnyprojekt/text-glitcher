const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const cssnano = require("cssnano");

// var uglify = require('gulp-uglify');
// var pump = require('pump');

// BrowserSync
function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browserSync.reload();
    done();
}


// CSS task
function css() {
    return gulp
        .src("./resources/scss/style.scss")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("./resources/css/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./resources/css/"))
        .pipe(browserSync.stream());
}

// Watch files
function watchFiles(done) {
    gulp.watch("./resources/scss/**/*", css);
    gulp.watch(
        [
            "./*.html",
            "./resources/**/*"
        ],
        browserSyncReload
    );
    done();
}

gulp.task("watch", watchFiles);
gulp.task("sync", browserSyncInit);
gulp.task("default", gulp.parallel(browserSyncInit, watchFiles));