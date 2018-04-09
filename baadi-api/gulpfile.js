const gulp = require("gulp");
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const rimraf = require('rimraf');
let nodeInstance;

// Compile ES6 code using Babel, move to dist folder & Run node server
const babelCmd = 'babel ./ --out-dir dist/ --ignore ./node_modules,./.babelrc,./package.json,./npm-debug.log --copy-files';

gulp.task('compile', function() {
    process.chdir(__dirname);
    compile();
});

gulp.task('compile-start-server', function() {
    process.chdir(__dirname);
    compile(true);
});

// Delete (rm -rf) the dist/ folder
gulp.task('remove-dist', function() {
    rimraf('dist/', function(err) {
        if(err) {
            console.log('Error in deleting dist folder', err);
        }
    });
});

// Default task - rm rf, compile and serve
gulp.task('default', function() {
    runSequence('remove-dist', 'compile-start-server');
    return watch(['**/*.js', '!node_modules/**', '!dist/**'], function() {
        console.log('Detected changes.');
        return runSequence('remove-dist', 'compile-start-server');
    });
});

// Run tasks when changes are detected
//gulp.watch(['**/*.js', '!node_modules/**', '!dist/**'], ['default']);

// Gulp build task
gulp.task('build', function() {
    return runSequence('remove-dist', 'compile');
});

// ********************************************************
// Common functions
// ********************************************************
/**
 * Show errors in console
 * @param {*} err 
 * @param {*} stdout 
 * @param {*} stderr 
 */
function showErrors(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(err);
}

/**
 * Compile ES6 and start node server
 * @param {*} startServer : Start node server (Optional)
 */
function compile(startServer) {
    exec(babelCmd, function(err) {
        if(err) {
            console.log('Error in ES6 compilation', err);
            return;
        }

        console.log('ES6 compiled successfully.');

        if (nodeInstance) {
            nodeInstance.kill();
            console.log('Node server stopped.');
        }

        if(startServer) {            
            nodeInstance = spawn('node', ['dist/index.js'], {stdio: 'inherit'});
            nodeInstance.on('close', function (code) {
                if (code === 8) {
                  gulp.log('Error detected, waiting for changes...');
                }
            });
            console.log('Node server started.');
        } else {
            process.exit();
        }
    });
}