let gulp  = require('gulp');
let gutil = require('gulp-util');
let nodemon = require('gulp-nodemon');
let sass = require('gulp-saa')

// Task  

// Default task for dev 
gulp.task('default', function() {
    nodemon({
        script: 'server.js',
        ignore: ['./node_modules/**']
    }).on('restart', function(){
        console.log('Restarting node server');
    });
});