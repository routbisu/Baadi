const gulp = require("gulp");
const runSequence = require('run-sequence');
const exec = require('child_process').exec;
const rimraf = require('rimraf');

// Compile ES6 code using Babel, move to dist folder & Run node server
const babelCmd = 'babel ./ --out-dir dist/ --ignore ./node_modules,./.babelrc,./package.json,./npm-debug.log --copy-files';
gulp.task('compile-es6', function() {
    process.chdir(__dirname);
    exec(babelCmd, function() {
        exec('node dist/index.js', showErrors);
    });
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
    return runSequence('remove-dist', 'compile-es6');
});

// Run tasks when changes are detected
gulp.watch(['**/*.js', '!node_modules/**', '!dist/**'], ['default']);


/**
 * Common functions
 */
// Show errors in console
function showErrors(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(err);
}