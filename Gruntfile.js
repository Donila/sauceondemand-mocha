'use strict';
/*globals module*/

module.exports = function (grunt) {

    var defaultBrowsers = [
        {
            "os": "Linux",
            "platform": "LINUX",
            "browser": "chrome",
            "browser-version": "47",
            "long-name": "Google Chrome",
            "long-version": "47.0.2526.73",
            "url": "sauce-ondemand:?os=Linux&browser=chrome&browser-version=47&username=daniildziaruhin&access-key=5ff41c7f-e213-46d1-82a9-3ef39194ddca"
        },
        {
            "os": "Windows 10",
            "platform": "XP",
            "browser": "firefox",
            "browser-version": "43",
            "long-name": "Firefox",
            "long-version": "43.0.",
            "url": "sauce-ondemand:?os=Windows 10&browser=firefox&browser-version=43&username=daniildziaruhin&access-key=5ff41c7f-e213-46d1-82a9-3ef39194ddca"
        }
    ];

    // use browsers defined in Jenkins SauceOnDemand plugin section or defaultBrowsers
    var browsers = process.env.SAUCE_ONDEMAND_BROWSERS || defaultBrowsers;

    // for single browser configuration
    if(process.env.BROWSER && process.env.PLATFORM && process.env.VERSION) {
        browsers = [{
            "platform": process.env.PLATFORM,
            "browser": process.env.BROWSER,
            "browser-version": process.env.VERSION
        }];
    }

    console.log('browsers: ');
    console.log(JSON.stringify(browsers));

    var shellCommands = [];

    // configure tasks
    var browserTasks = [];
    for(var i = 0; i < browsers.length; i++) {
        var browser = browsers[i];
        var task = 'run_' + browser.platform + '_' + browser.browser + '_' + browser['browser-version'];
        browserTasks.push(task);

        var command = 'PLATFORM='+browser.platform+' BROWSER='+browser.browser+' VERSION='+browser['browser-version']+' node index.js';
        shellCommands.push({ cmd: command });
    }

    grunt.initConfig({
        /*shell: {
            runTests: {
                command: function(platform, browser, version) {
                    var reportName = platform + '_' + browser + '_' + version + '.xml';
                    var command =
                        'PLATFORM='+platform+' BROWSER='+browser+' VERSION='+version+
                        //' JUNIT_REPORT_PATH='+reportName+ ' JUNIT_REPORT_STACK=1' +
                        //' ./node_modules/.bin/mocha tests -R mocha-jenkins-reporter || true';
                            ' node index.js';
                    console.log('Command: ' + command);
                    return command;
                }
            }
        },*/

        parallel: {
            assets: {
                tasks: shellCommands
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-parallel');
    //grunt.loadNpmTasks('grunt-shell');

    // register tasks
    grunt.registerTask('default', ['parallel']);

    /*for(var i = 0; i < browsers.length; i++) {
        var browser = browsers[i];
        var command = 'shell:runTests:' + browser.platform + ':' + browser.browser + ':' + browser['browser-version'];
        var task = 'run_' + browser.platform + '_' + browser.browser + '_' + browser['browser-version'];
        grunt.registerTask(task, [command]);
    }*/
};
