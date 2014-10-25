'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var saveLicense = require('uglify-save-license');
var streamqueue = require('streamqueue');

gulp.task('default', function () {
    var c = {
        reset: '\x1b[0m',
        bold: '\x1b[1m',
        green: '\x1b[32m',
        magenta: '\x1b[35m'
    };
    
    console.log('');
    console.log(c.green + c.bold + 'Main Commands' + c.reset);
    console.log(c.green + '-------------------------------------------' + c.reset);
    console.log(c.green + 'clean' + c.reset + ' - delete the build/ folder.');
    console.log(c.green + 'build' + c.reset + ' - execute the release build and output into the build/ folder.');
    console.log(c.green + 'test' + c.reset + ' - run the karma tests located in test/unit/');
    console.log('');
    console.log(c.green + c.bold + 'All Commands' + c.reset);
    console.log(c.green + '-------------------------------------------' + c.reset);
    console.log(Object.keys(gulp.tasks).sort().join('\n'));
    console.log('');
    return;
});

gulp.task('build:styles', function () {
    return gulp.src([
            'src/**/*.less'
        ])
        .pipe($.plumber())
        .pipe($.concat('angular-json-tree.css'))
        .pipe($.less())
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('build'))
        .pipe($.size());
});

gulp.task('build:scripts', function () {
    return gulp.src('src/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.concat('angular-json-tree.js'))
        .pipe(gulp.dest('build'))
        .pipe($.size());
});

gulp.task('build:scripts:min', ['build:scripts', 'clean:scripts:min'], function () {
    return gulp.src('build/**/*.js')
        .pipe($.uglify({
            preserveComments: saveLicense
        }))
        .pipe($.rename({extname: ".min.js"}))
        .pipe(gulp.dest('build'))
        .pipe($.size());
})

gulp.task('build', ['build:styles', 'build:scripts', 'build:scripts:min']);

gulp.task('clean', function () {
    return gulp.src(['build'], {
        read: false
    }).pipe($.rimraf());
});

gulp.task('clean:scripts:min', function () {
    return gulp.src('build/**/*.min.js', {
            read: false
        }).pipe($.rimraf());
})

gulp.task('test', function () {

    var testFiles = streamqueue({
            objectMode: true
        },
        gulp.src('bower_components/angular/angular.js'),
        gulp.src('bower_components/angular-mocks/angular-mocks.js'),
        gulp.src('src/**/*.js'),
        gulp.src('test/unit/**/*.js')
    );

    return testFiles
        .pipe($.karma({
            configFile: 'test/karma.conf.js',
            action: 'run'
        }));
});
