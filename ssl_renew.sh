#!/bin/sh
#
service nginx stop  # We stop nginx server

# crontab job:	 0 0 1 * * /path/to/ssl_renew.sh

#Test command if ! certbot certonly -tvv --standalone --renew-by-default -d jean-massat.com,www.jean-massat.com > /var/log/letsencrypt/renew.log 2>&1 ; then 
if ! certbot certonly -tvv --standalone --keep -d jean-massat.com,www.jean-massat.com > /var/log/letsencrypt/renew.log 2>&1 ; then
    echo "ssl certif renew failed, please have a look at the following log file:"
    cat /var/log/letsencrypt/renew.log
    service nginx restart #Restart nginx server
    exit 1
fi

service nginx restart #Restart nginx server
echo "sll certif renew success"