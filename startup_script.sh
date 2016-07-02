#!/bin/sh

#getting the dir path the webapp
BASEDIR=$(dirname "$0")

#Running the app with node
sudo -u www-data node $BASEDIR/main.js
