var gulp = require("gulp");
var ts = require("gulp-typescript");
var clean = require('gulp-clean');
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(clean())
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});