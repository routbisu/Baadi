let gulp = require('gulp');
let gutil = require('gulp-util');
let nodemon = require('gulp-nodemon');
let spawn = require('child_process').spawn;
let sass = require('gulp-sass');
let jshint = require('gulp-jshint');
let node;

const gulpConfig = {
    nodeServerEntry: 'server.js'
}

// Task for JSLint
gulp.task('lint', function () {
    gulp.src('./**/*.js')
        .pipe(jshint())
})

// Task for starting node server
gulp.task('node-server', function () {
    nodemon({
        "restartable": "rs",
        "ignore": [
            ".git",
            "node_modules/**/node_modules",
            "public/**/**.*"
        ],
        "delay": "1000",
        "verbose": true,
        "execMap": {
            "js": "node --harmony"
        },
        "env": {
            "NODE_ENV": "development"
        },
        "ext": "js json"
    });
});

// Task for starting node server
// gulp.task('server', function() {
//     if (node) node.kill()
//     node = spawn('node', [gulpConfig.nodeServerEntry], {stdio: 'inherit'})
//     node.on('close', function (code) {
//         if (code === 8) {
//             gulp.log('Error in node server, waiting for changes...');
//         }
//     });
// })

/***************************************************************
 *  Tasks for Baadi Web Portal
 **************************************************************/
// Baadi Web - Compile SASS files
gulp.task('sass', function () {
    return gulp.src('./public/baadi-web/src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/baadi-web/src/assets/css'));
});

// Baadi Web - Watch SASS folder
gulp.task('sass:watch', function() {
    gulp.watch('./public/baadi-web/src/sass/*.scss', ['sass']);
});

// Baadi Web - Angular CLI compile

/***************************************************************
 *  Gulp tasks for development
 **************************************************************/
gulp.task('default', ['sass', 'sass:watch']);