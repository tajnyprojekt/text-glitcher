var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

var uglify = require('gulp-uglify');
var pump = require('pump');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./resources/scss/**/**/*.scss", ['sass']);

    gulp.watch("./resources/components/**/*.js").on('change', browserSync.reload);
    gulp.watch("./resources/js/**/*.js").on('change', browserSync.reload);

    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./resources/scss/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./resources/css"))
        .pipe(browserSync.stream());
});

// uglify js and css
gulp.task('release', function (cb) {
  pump([
        gulp.src('./resources/js/**/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('default', ['serve']);
