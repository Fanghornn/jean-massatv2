## Synopsis

jean-massatv2 is the second version of my personnal resume/portfolio website.

![jean-massatv2_preview](http://i.imgur.com/TVg3EIQ.jpg)

## OS Support

Gnu/Linux only, debian 7 & 8 as far as i tested it

## Dependencies
  
nodejs V0.10+ & npm (node package manager) 
Visit https://github.com/joyent/node for more infos & guides

Now you're ready to install jean-massatv2.

## Using an HTTP server

I personally use Nginx to host open-dj, this is very useful as i can set a reverse proxy on the port used by open-dj
redirecting it to the port 80 allowing your users to just type the ip/dns of your server in their favourite browser address bar without specifying any port.

You can refer to http://nginx.org/en/docs/ for further informations.

## Installation

clone from github servers:

---------------------------------------------------

    cd /path/to/your/webdir
 
    git clone https://github.com/Fanghornn/jean-massatv2.git jean-massatv2

---------------------------------------------------

Installing npm dependencies:
  
----------------------------------------------------
    
    sudo npm install
    
----------------------------------------------------

Now that you have cloned the repo and installed npm dependencies, 
you must edit the file "config.js" using nano or whatever.

---------------------------------------------------

    config.hostName = "yourdomain.com"
    
    config.port = "set port" (Only if you're not using a reverse proxy like mentioned above)

    config.mailLogin = "yourGmailLogin" (without the @domain-name.com)

    config.mailPassword = "yourGmailPass"

---------------------------------------------------

These two last options are required to enable email sending from the front-end form by your visitors.

If you have made changes to JS or CSS scripts, and you want to run as production environement,
You'll need to compress jean-massat's scripts in static directory.

You can perform that just by running the following command at the root directory.

----------------------------------------------------

    node uglify-jean-massat.js

----------------------------------------------------

You'll be notified if errors has occured.
Please, note that you can edit that file and add your own scripts into the JS and CSS scripts list declaration.

Running the app:

----------------------------------------------------

    node main.js

----------------------------------------------------

## Production

pm2 npm package is very usefull to persist a node application even if the server goes down and proceed to reboot.

To begin install the package globally to your system:

----------------------------------------------------

    npm i pm2 -g
    pm2 updatePM2

----------------------------------------------------

Then you can start using pm2 to run your node app with your web user:

----------------------------------------------------

    cd /path/to/jean-massat/
    pm2 start main.js --watch --merge-logs
    pm2 list

----------------------------------------------------

If everything went fine, you should see our node app within a list of your pm2 running processes.
Check if the status is ok
NB: The "--watch" argument will restart the app everytime a single file has been changed in jean-massat directory and "--merge-logs" will unify our app logs (like stdout and stderr).

Now we need to tell to pm2, that we want to save our processes list and make it persistant like a debian service after each system boot.
Just run the following:

----------------------------------------------------

    pm2 save
    pm2 startup

----------------------------------------------------

pm2 may have notified you that you should run a command like "sudo env PATH=$PATH etc..", indeed, the command needs sudo privileges to create init scripts like /etc/init.d/pm2-init.sh

You can also edit this script if you are getting troubles when testing the service intialisation.

## Debug 

To enable a debug working environement, just set the config.dev value to true in config.js file in the root directory.

#### Have fun

## Author

Jean Baptiste Priam Massat (Aka Fanghornn)

## License

GPL V3
