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

    var browsers = process.env.SAUCE_ONDEMAND_BROWSERS || defaultBrowsers;

    console.log('browsers: ');
    console.log(JSON.stringify(browsers));

    // configure tasks
    var browserTasks = [];
    for(var i = 0; i < browsers.length; i++) {
        var browser = browsers[i];
        var task = 'run_' + browser.platform + '_' + browser.browser + '_' + browser['browser-version'];
        browserTasks.push(task);
    }

    grunt.initConfig({
        shell: {
            runTests: {
                command: function(platform, browser, version) {
                    return 'PLATFORM='+platform+' BROWSER='+browser+' VERSION='+version+' ./node_modules/.bin/mocha tests -R mocha-junit-reporter'
                }
            }
        },

        parallel: {
            assets: {
                options: {
                    grunt: true
                },
                tasks: browserTasks
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-shell');

    // register tasks
    grunt.registerTask('default', ['parallel']);

    for(var i = 0; i < browsers.length; i++) {
        var browser = browsers[i];
        var command = 'shell:runTests:' + browser.platform + ':' + browser.browser + ':' + browser['browser-version'];
        var task = 'run_' + browser.platform + '_' + browser.browser + '_' + browser['browser-version'];
        grunt.registerTask(task, [command]);
    }
};
