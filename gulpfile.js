let gulp = require('gulp');
let gutil = require('gulp-util');
let nodemon = require('gulp-nodemon');
let spawn = require('child_process').spawn;
let exec = require('child_process').exec;
let sass = require('gulp-sass');
let node;

const gulpConfig = {
    nodeServerEntry: 'server.js'
}

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
gulp.task('websass', function () {
    return gulp.src('./public/baadi-web/src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/baadi-web/src/assets/css'));
});

// Baadi Web - Watch SASS folder
gulp.task('websass:watch', function() {
    gulp.watch('./public/baadi-web/src/sass/*.scss', ['sass']);
});

// Baadi Web - Angular CLI compile
gulp.task('webng', function(cb) {
    exec('ng serve ./public/baadi-web/.angular-cli.json -o', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

/***************************************************************
 *  Gulp tasks for development
 **************************************************************/

 // Default task - Run NodeAPI, Web Portal, Admin Portal
gulp.task('serve', ['websass', 'websass:watch', 'webng']);

// Default task - Run NodeAPI only
gulp.task('serve:api', ['']);

// Default task - Run Web Portal Only
gulp.task('serve:web', ['websass', 'websass:watch']);

// Default task - Run Web Portal and NodeAPI
gulp.task('serve:api:web', ['']);

// Default task - Run Admin Portal and NodeAPI
gulp.task('serve:api:admin', ['']);