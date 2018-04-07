var gulp = require("gulp");
var ts = require("gulp-typescript");
var clean = require('gulp-clean');
var tsProject = ts.createProject("tsconfig.json");

gulp.task("clean", function () {
    return gulp.src('dist', { read: false})
        .pipe(clean());
});

gulp.task("default", function () {
    return tsProject.src()
        //.pipe(clean())
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});
