var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var fileName =
    (process.env.BROWSER && process.env.PLATFORM && process.env.VERSION)
        ? process.env.PLATFORM + process.env.BROWSER + process.env.VERSION + '.xml'
        : 'results.xml';

// Instantiate a Mocha instance.
var mocha = new Mocha({
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
        mochaFile: fileName
    }
});

var testDir = 'tests';

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';

}).forEach(function(file){
    mocha.addFile(
        path.join(testDir, file)
    );
});

console.log('Running with output to ' + fileName);

// Run the tests.
mocha.run()
    .on('test', function(test) {
        console.log('Test started: '+test.title);
    })
    .on('test end', function(test) {
        console.log('Test done: '+test.title);
    })
    .on('pass', function(test) {
        console.log('Test passed');
        console.log(test);
    })
    .on('fail', function(test, err) {
        console.log('Test fail');
        console.log(test);
        console.log(err);
    })
    .on('end', function() {
        console.log('All done');
    });
