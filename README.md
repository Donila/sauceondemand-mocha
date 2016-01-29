# Configure your Saucelabs credentials first

export SAUCE_USERNAME=<your sauce username>
export SAUCE_ACCESS_KEY=<your sauce access key> (https://saucelabs.com/beta/user-settings)

# Install packages
(sudo) npm install -g grunt-cli
npm install

# Run
grunt

# What happening:
By default it launches in parallel 2 default browser configurations:
linux_chrome_47 and xp_firefox_43 (from defaultBrowsers in Gruntfile.js)

If you run it through SauceOnDemand plugin, it will read SAUCE_ONDEMAND_BROWSERS env variable if you
defined multiple browsers, or read 3 env variables PLATFORM, BROWSER and VERSION if you define
single browser configuration.