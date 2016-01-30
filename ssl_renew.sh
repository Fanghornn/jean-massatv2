#!/bin/sh
#
service nginx stop  # We stop nginx server

#Test command if ! /opt/letsencrypt/letsencrypt-auto certonly -tvv --standalone --renew-by-default -d jean-massat.com,www.jean-massat.com > /var/log/letsencrypt/renew.log 2>&1 ; then 
if ! /opt/letsencrypt/letsencrypt-auto certonly -tvv --standalone --keep -d jean-massat.com,www.jean-massat.com > /var/log/letsencrypt/renew.log 2>&1 ; then
    echo ssl certif renew failed, please have a look on this log:
    cat /var/log/letsencrypt/renew.log
    service nginx start #Restart nginx server
    exit 1
fi

service nginx start #Restart nginx server
echo sll certif renew success