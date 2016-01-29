var exec = require('child_process').exec;

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

for(var i = 0; i < browsers.length; i++) {
    var browser = browsers[i];

    var command = 'node runner.js';

    var env = {
        'PLATFORM': browser.platform,
        'BROWSER': browser.browser,
        'VERSION': browser['browser-version'],
        'SAUCE_USERNAME': process.env.SAUCE_USERNAME,
        'SAUCE_ACCESS_KEY': process.env.SAUCE_ACCESS_KEY
    };

    console.log('Executing: \'%s\' with env=%s', command, JSON.stringify(env));

    exec(command, { env: env }, function (err, stdout, stderr){
        if (err) {
            console.log("child processes failed with error code: " +
                err.code);
        }
        console.log(stdout);
    });
};
