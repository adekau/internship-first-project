const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const tsc = require('gulp-typescript');
const tslint = require('gulp-tslint');

gulp.task('start', () => {
    gulp.start(['tslint', 'nodemon']);
});

gulp.task('nodemon', () => {
    nodemon({
        scripts: './server.js',
        tasks: ['tslint', 'compile']
    });
});

gulp.task('copyconfig', () => {
    gulp.src(['server/src/config/**/*'])
        .pipe(gulp.dest('server/dist/config'));
});

gulp.task('compile', ['copyconfig'], () => {
    const tsProject = tsc.createProject('server/src/tsconfig.json');
    const result = tsProject.src().pipe(tsProject());

    result.js.pipe(gulp.dest('server/dist'));
});


gulp.task('tslint', () =>
    gulp.src('./server/src/main.ts')
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report())
);

gulp.task('test', () => {
    gulp.src('server/src/test/**/*')
        .pipe(gulp.dest('server/dist/test'));
});
