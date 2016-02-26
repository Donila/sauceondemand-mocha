# Configure your Saucelabs credentials first

export SAUCE_USERNAME=your_sauce_username
export SAUCE_ACCESS_KEY=your_sauce_access_key (https://saucelabs.com/beta/user-settings)

# Install packages
npm install

# Run locally
node index.js

# What happening:
By default it launches in parallel 2 default browser configurations:
linux_chrome_47 and xp_firefox_43 (from defaultBrowsers in Gruntfile.js)

If you run it through SauceOnDemand plugin, it will read SAUCE_ONDEMAND_BROWSERS env variable if you
defined multiple browsers, or read 3 env variables PLATFORM, BROWSER and VERSION if you define
single browser configuration.

# Configure in Jenkins
install Jenkins plugins: 
 https://wiki.jenkins-ci.org/display/JENKINS/GitHub+Plugin  
 https://wiki.jenkins-ci.org/display/JENKINS/Sauce+OnDemand+Plugin  
 https://wiki.jenkins-ci.org/display/JENKINS/JUnit+Plugin  
 
Configure GitHub and SauceLabs credentials (in Jenkins options)  
Create project and clone https://github.com/Donila/sauceondemand-mocha.git using Github plugin,  
Check "Sauce Labs Support" checkbox and choose browsers/os's you want to test  
Insert following shell command:  

>    export SAUCE_USERNAME=$SAUCE_USERNAME  
>    export SAUCE_ACCESS_KEY=$SAUCE_ACCESS_KEY  
>    npm install  
>    node index.js  
    
then build project



