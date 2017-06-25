'use strict';

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const nodemon = require('gulp-nodemon');

gulp.task('copy', (done) => {
    gulp.src('src/seed/*.json').pipe(gulp.dest('dist/seed/'));
    done();
});

gulp.task('typescript', () => {
    return gulp.src('src/**/*.ts').pipe(typescript({
        noImplicitAny: true
    })).pipe(gulp.dest('dist'));
});

gulp.task('start', () => {
  nodemon({
    script: 'dist/app.js',
    ext: 'ts html',
    env: {
      'NODE_ENV': 'development'
    },
    tasks: ['typescript']
  });
});

gulp.task('default', ['copy', 'typescript', 'start']);
